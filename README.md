# CareerCompass — Student Career Advisor & Learning Route Planner

CareerCompass is a student guidance website with career planning, exam roadmaps, and student support tools. Its Electric Orchard design pairs expressive violet with fresh lime accents, oversized Bricolage Grotesque headings, and a warm lavender canvas, with a one-click dark mode.

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
8. **Exams & Roadmaps**:
   * Filter an exam guide by category and difficulty, view an illustrative pattern breakdown, and follow a 12-month study checklist saved in browser storage.
   * Ask the AI recommender for exam ideas based on interests and subject strengths. Exam rules can change; use each exam's official website to verify current details.
9. **Student Support**:
   * Quick links to India's 112 emergency number and Tele-MANAS at 14416, plus a local mood check-in history and an optional 60-second breathing exercise.
   * Aarav is an AI listener, not a person or a therapist. Messages are sent to the configured AI service and are not saved by the page. The Peer Circle is a local-only demo feed, not a public community.
10. **Career Visualizations & Privacy**:
    * Career fit radar, comparison bars, animated journey flow, and a quick-exit button that navigates away from the app.
11. **Real-World Photo Stories**:
    * Career collaboration, classroom learning, and peer connection photos give the guidance pages a more tangible, real-life feel. Photographs are loaded from Unsplash and Pexels, so they require an internet connection.

## Firebase Cloud Sync & Authentication
1. **Google Sign-In**: Click **Sign in with Google** in the top bar to log in.
2. **Cloud Sync**: All saved careers, quiz results, and roadmap progress automatically sync to your Firebase Firestore database under `students/{uid}`.
3. **Configure Your Credentials**:
   * Open the app and click **Connect Firebase** to enter your Firebase web configuration. Do not commit API keys or service-account credentials to the repository.
   * In your [Firebase Console](https://console.firebase.google.com/):
     - Enable **Google** in **Authentication → Sign-in method**.
     - Enable **Firestore Database**.

---

## Deploy to Firebase Hosting
### Option 1: 1-Click Batch (Windows)
Double-click **`deploy-firebase.bat`**.

### Option 2: Command Line
```bash
npm run deploy:firebase
```

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
├── index.html              # Frontend, client logic, presets, and checklist
├── features.css            # Feature layouts and responsive Electric Orchard theme
├── features.js             # Exam, study plan, support, and career visualization interactions
├── career-tools.js         # Career quiz, explorer filters, and comparison matrix
├── careers-data.js         # Curated career database and quiz questions
├── firebase-config.js      # Firebase project credentials
├── firebase-service.js     # Firebase Auth (Google Sign-In) and Firestore cloud sync
├── firebase.json           # Firebase Hosting configuration
├── .firebaserc             # Firebase project target alias
├── server.js               # Zero-dependency local Node.js server (serves app & proxies API)
├── start-app.bat           # 1-click Windows launcher (starts server & opens browser)
├── deploy-firebase.bat     # 1-click Windows Firebase deployer
├── package.json            # Project configuration & npm scripts
└── README.md
```
