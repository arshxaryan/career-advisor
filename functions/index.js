"use strict";

const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

const geminiApiKey = defineSecret("GEMINI_API_KEY");
const MODELS = [
  "gemini-3.5-flash",
  "gemini-flash-lite-latest",
  "gemini-3.1-flash-lite",
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-3.6-flash"
];

exports.api = onRequest(
  {
    region: "us-central1",
    secrets: [geminiApiKey],
    maxInstances: 3,
    timeoutSeconds: 120
  },
  async (req, res) => {
    const route = String(req.path || req.url || "").replace(/\/+$/, "");

    if (req.method === "OPTIONS") {
      return res.status(204).end();
    }

    if (route.endsWith("/health")) {
      res.set("Cache-Control", "no-store");
      return res.status(200).json({
        status: "ok",
        hasApiKey: Boolean(geminiApiKey.value()),
        nodeVersion: process.version
      });
    }

    if (!route.endsWith("/generate-careers")) {
      return res.status(404).json({ error: "API route not found." });
    }

    if (req.method !== "POST") {
      res.set("Allow", "POST, OPTIONS");
      return res.status(405).json({ error: "Method not allowed. Use POST." });
    }

    const body = req.body && typeof req.body === "object" ? req.body : {};
    const prompt = body.prompt;
    if (typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ error: "Missing or invalid 'prompt' in request body." });
    }
    if (prompt.length > 100000) {
      return res.status(413).json({ error: "Prompt is too long." });
    }

    const apiKey =
      typeof body.apiKey === "string" && body.apiKey.trim()
        ? body.apiKey.trim()
        : geminiApiKey.value();
    if (!apiKey) {
      return res.status(500).json({
        error: "The server is missing GEMINI_API_KEY. Set it using Firebase Functions secrets."
      });
    }

    const failures = [];
    for (const model of MODELS) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.7, maxOutputTokens: 6000 }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text =
            data.candidates?.[0]?.content?.parts
              ?.map((part) => part.text || "")
              .join("") || "";
          return res.status(200).json({ text, model });
        }

        failures.push(`${model}: HTTP ${response.status}`);
        console.error(`Gemini request failed for ${model} with HTTP ${response.status}.`);
      } catch (error) {
        failures.push(`${model}: network error`);
        console.error(`Gemini request failed for ${model}:`, error.message);
      }
    }

    return res.status(502).json({
      error: "Gemini could not complete the request. Check the API key and model availability.",
      attempts: failures
    });
  }
);
