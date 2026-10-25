# CareerCompass — Student Career Advisor & Learning Route Planner

CareerCompass is a student guidance website with career planning, exam roadmaps, and student support tools. Its Electric Orchard design pairs expressive violet with fresh lime accents, oversized Bricolage Grotesque headings, and a warm lavender canvas, with a one-click dark mode.

---

## Firebase Hosting

This project is configured for Firebase project `careercompass-77eae`. Follow [FIREBASE-DEPLOY.md](FIREBASE-DEPLOY.md) to sign in, configure the Gemini API key secret, and deploy Hosting and Cloud Functions.

Users can create an account with email/password or sign in with Google. Signed-in users sync saved careers and study/roadmap progress using Firestore. Mood history, peer notes, and personal API keys stay in the current browser.

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

---

## File Structure

```
careercompass/
├── .firebaserc              # Default Firebase project alias
├── firebase.json            # Hosting and Functions deployment configuration
├── firestore.rules          # Owner-only Firestore data access rules
├── firebase-config.js       # Public Firebase Web App configuration
├── account.js               # Sign-in and account data synchronization
├── index.html               # Frontend, client logic, presets, and checklist
├── features.css             # Feature layouts and responsive Electric Orchard theme
├── features.js              # Exam, study plan, support, and career visualization interactions
├── careers-data.js          # Career data used by the frontend
├── career-tools.js          # Shared career-planning utilities
├── functions/
│   ├── index.js             # Firebase API and health-check function
│   ├── package.json         # Cloud Function dependencies
│   └── package-lock.json    # Locked Cloud Function dependencies
├── FIREBASE-DEPLOY.md       # Firebase setup and deployment instructions
└── README.md
```
