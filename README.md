# CareerCompass

A dark-themed career and learning-route planner. Static frontend (`index.html`)
plus one serverless function (`api/generate-careers.js`) that calls the
Anthropic API on the server, so your API key never reaches the browser.

## Deploy on Vercel

**Option A — via the Vercel dashboard (no CLI needed)**
1. Push this folder to a GitHub repo (or upload it directly — vercel.com
   supports drag-and-drop deploys of a folder, but the api/ function needs
   a git-based project to pick up environment variables cleanly, so GitHub
   is the smoother path).
2. Go to vercel.com → **Add New… → Project** → import that repo.
3. Leave the framework preset as "Other" — no build step is needed.
4. Before the first deploy (or right after, then redeploy), go to
   **Settings → Environment Variables** and add:
   - `ANTHROPIC_API_KEY` = your key from console.anthropic.com
5. Deploy. Your site is live at `your-project.vercel.app`.

**Option B — via the CLI**
```bash
npm install -g vercel
cd careercompass
vercel                     # first deploy, follow the prompts
vercel env add ANTHROPIC_API_KEY   # paste your key when prompted
vercel --prod               # redeploy with the env var applied
```

## Local testing
```bash
npm install -g vercel
vercel dev
```
This runs both the static page and the `/api/generate-careers` function
locally (reads `ANTHROPIC_API_KEY` from a `.env` file if you add one —
don't commit that file).

## File structure
```
careercompass/
├── index.html              # the app (dark theme, all UI + client logic)
├── api/
│   └── generate-careers.js # serverless function, holds the API key
├── package.json
└── README.md
```

## Customizing
- **Model**: change `"model": "claude-sonnet-5"` in `api/generate-careers.js`
  to whichever tier you have access to.
- **Colors/type**: all design tokens are CSS variables at the top of the
  `<style>` block in `index.html` (`--bg`, `--brass`, `--font-display`, etc.).
