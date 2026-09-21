// CareerCompass Local Server (Pure Node.js, zero dependencies)
// Serves static files and proxies requests to Google Gemini API securely.

const http = require("http");
const fs = require("fs");
const path = require("path");

// Simple .env.local / .env reader
function loadEnv() {
  const envFiles = [".env.local", ".env"];
  for (const file of envFiles) {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
      try {
        const content = fs.readFileSync(fullPath, "utf8");
        for (const line of content.split("\n")) {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith("#")) {
            const eqIdx = trimmed.indexOf("=");
            if (eqIdx !== -1) {
              const key = trimmed.slice(0, eqIdx).trim();
              const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
              if (!process.env[key]) {
                process.env[key] = val;
              }
            }
          }
        }
      } catch (e) {
        console.error(`Warning: Could not read ${file}:`, e.message);
      }
    }
  }
}

loadEnv();

const MODELS_TO_TRY = [
  "gemini-3.5-flash",
  "gemini-flash-lite-latest",
  "gemini-3.1-flash-lite",
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-3.6-flash",
];

async function callGemini(prompt, apiKey) {
  let lastError = null;

  for (const model of MODELS_TO_TRY) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 6000,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const text =
          data.candidates?.[0]?.content?.parts
            ?.map((p) => p.text || "")
            .join("") || "";
        return { ok: true, text, modelUsed: model };
      } else {
        const errText = await response.text();
        console.warn(`[Gemini API] Model ${model} returned ${response.status}: ${errText.slice(0, 200)}`);
        lastError = `Gemini API error (${response.status}): ${errText}`;
      }
    } catch (err) {
      console.warn(`[Gemini API] Failed request with ${model}:`, err.message);
      lastError = err.message;
    }
  }

  return { ok: false, error: lastError || "Failed to call Gemini API" };
}

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

function startServer(port = 3000) {
  const server = http.createServer(async (req, res) => {
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const pathname = parsedUrl.pathname;

    // API route: /api/generate-careers
    if (pathname === "/api/generate-careers") {
      if (req.method !== "POST") {
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Method not allowed. Use POST." }));
        return;
      }

      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
        if (body.length > 1e6) {
          req.destroy();
        }
      });

      req.on("end", async () => {
        try {
          const parsed = JSON.parse(body || "{}");
          const prompt = parsed.prompt;
          const clientKey = parsed.apiKey; // Optional client-override key

          if (!prompt || typeof prompt !== "string") {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Missing or invalid 'prompt' in request body." }));
            return;
          }

          const apiKey = clientKey || process.env.GEMINI_API_KEY;
          if (!apiKey) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                error:
                  "Server missing GEMINI_API_KEY. Add it to .env.local as GEMINI_API_KEY=your_key or configure it in the UI.",
              })
            );
            return;
          }

          const result = await callGemini(prompt, apiKey);
          if (result.ok) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ text: result.text, model: result.modelUsed }));
          } else {
            res.writeHead(502, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: result.error }));
          }
        } catch (e) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON request body: " + e.message }));
        }
      });
      return;
    }

    // Health check endpoint
    if (pathname === "/api/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: "ok",
          hasApiKey: !!process.env.GEMINI_API_KEY,
          nodeVersion: process.version,
        })
      );
      return;
    }

    // Static file serving
    let safePath = pathname === "/" ? "/index.html" : pathname;
    safePath = path.normalize(safePath).replace(/^(\.\.[\/\\])+/, "");
    const filePath = path.join(__dirname, safePath);

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        // Fallback to index.html for SPA-style routing if needed
        const indexPath = path.join(__dirname, "index.html");
        fs.readFile(indexPath, (err2, indexData) => {
          if (err2) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
          } else {
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(indexData);
          }
        });
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";

      fs.readFile(filePath, (readErr, data) => {
        if (readErr) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
          return;
        }
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      });
    });
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${port} in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error("Server error:", err);
    }
  });

  server.listen(port, () => {
    console.log(`\n======================================================`);
    console.log(`🧭 CareerCompass server running!`);
    console.log(`👉 Open in your browser: http://localhost:${port}`);
    console.log(`   API Status: ${process.env.GEMINI_API_KEY ? "Gemini Key configured" : "No GEMINI_API_KEY found"}`);
    console.log(`======================================================\n`);
  });
}

// Start on port 3000 (or specified by PORT env var)
const initialPort = parseInt(process.env.PORT || "3000", 10);
startServer(initialPort);
