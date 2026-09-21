# CareerCompass — Student Career Advisor & Learning Route Planner

CareerCompass is an interactive, dark-brass themed AI career advisor website designed to guide students based on their academic background, interests, skills, and work style.

---

## Quick Start (Run Locally)

### Option 1: Double-Click (Recommended on Windows)
Double-click **`start-app.bat`**.
* Launches the local server automatically.
* Opens `http://localhost:3000` in your default browser.
* Reads your Gemini API key from `.env.local` securely.

### Option 2: Command Line
```bash
npm start
```
or
```bash
node server.js
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Features

1. **Student Coordinates Form & 1-Click Presets**:
   * Pre-filled templates for *CS & AI*, *Data Science*, *UI/UX Design*, *Commerce & FinTech*, and *Robotics & IoT*.
2. **5 Recommended Career Routes**:
   * AI-generated routes with custom match scores, market demand rating, and realistic starting salaries.
3. **Interactive 12-Week Roadmap**:
   * Clickable checkboxes for every week.
   * Tracks progress in real time (e.g. `4/12 weeks completed (33%)`) and saves state to browser storage.
4. **Skill Gap Analysis**:
   * Visual indicator pills distinguishing **✓ Acquired Skills** from **+ Skills to Learn**.
5. **Comparison Matrix**:
   * Side-by-side comparison table of all 5 routes.
6. **Logbook & Export**:
   * Save favorite routes to a personal logbook.
   * 1-click clipboard copying, downloadable `.txt` route logs, and print/PDF support.
7. **Resilient AI Backend**:
   * Multi-model cascade (`gemini-3.5-flash`, `gemini-flash-lite-latest`, `gemini-3.8-flash`) ensures seamless responses even during traffic spikes.

---

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. Import the repository in [vercel.com](https://vercel.com).
3. In **Settings → Environment Variables**, add:
   * `GEMINI_API_KEY` = your API key from Google AI Studio.
4. Deploy! Vercel will host `index.html` and run the serverless function at `/api/generate-careers`.

---

## File Structure

```
careercompass/
├── index.html              # Frontend (dark brass cartography UI, client logic, presets, checklist)
├── server.js               # Zero-dependency local Node.js server (serves app & proxies API)
├── start-app.bat           # 1-click Windows launcher (starts server & opens browser)
├── api/
│   └── generate-careers.js # Vercel serverless function (for cloud deployment)
├── package.json            # Project configuration & npm start script
├── .env.local              # Local environment variables (GEMINI_API_KEY)
└── README.md
```
