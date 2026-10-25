# Deploy CareerCompass with Firebase

Firebase Hosting serves the website, and a second-generation Cloud Function handles `/api/health` and `/api/generate-careers`. The Gemini key stays in Firebase Secret Manager.

Firebase Authentication provides email/password and Google sign-in. Firestore stores each signed-in user's saved careers and study/roadmap progress; mood history, peer notes, and API keys remain in the browser.

Exam and career guidance is informational. Names, schedules, paper patterns, eligibility and admission routes can vary by cycle, programme and institution; verify the current details using the official links in the app.

## One-time setup

1. Select the Firebase project `careercompass-77eae` in the [Firebase Console](https://console.firebase.google.com/). The repository's default Firebase project alias is already configured.
2. In **Project settings → General → Your apps**, register a Web app. The current `apiKey` and `appId` are already set in `firebase-config.js`; if you register a different Web app, replace them with that app's values. The Firebase web config is public; never put the Gemini key in this file.
3. In **Authentication → Sign-in method**, enable **Email/Password** and **Google**. In **Authentication → Settings → Authorized domains**, make sure your Hosting domain is listed.
4. Create a **Cloud Firestore** database in the Firebase Console. The included `firestore.rules` restricts account data to its owner.
5. Make sure the project uses the **Blaze (pay-as-you-go) plan**. Cloud Functions deployment requires a billing account. Review Firebase and Gemini usage and set budget alerts before launch.
6. Open PowerShell in the project folder and sign in:

   ```powershell
   npx firebase-tools login
   ```

   The CLI uses the `default` project alias from `.firebaserc`.

7. Store the Gemini API key as a Functions secret. The CLI prompts for the value; do not put the key in a command, source file, or Git:

   ```powershell
   npx firebase-tools functions:secrets:set GEMINI_API_KEY
   ```

8. Install the function dependency and deploy Hosting, Functions, and Firestore rules:

   ```powershell
   npm.cmd --prefix functions install
   npx firebase-tools deploy --only hosting,functions,firestore:rules
   ```

Firebase prints the public Hosting URL when deployment finishes. Visit that URL and test the Career Advisor and the **Settings → Test Connection** action.

## Authentication troubleshooting

- For a first-time user, select **New here? Create an account** before submitting the email and password.
- In **Authentication → Sign-in method**, confirm **Email/Password** and **Google** are enabled.
- In **Authentication → Settings → Authorized domains**, add `localhost` for local testing and the deployed Firebase Hosting domain for the live site.
- If sign-in fails, the account dialog displays the Firebase error code. For `auth/operation-not-allowed`, enable the provider; for `auth/unauthorized-domain`, add the current site's domain.

## Updating the site

To deploy updates, run this from the project folder:

```powershell
npx firebase-tools deploy --only hosting,functions,firestore:rules
```

Firebase Hosting serves files from the project root and excludes hidden files, documentation, and the Cloud Functions source. The `/api/**` Hosting rewrite sends API requests to the `api` Cloud Function.

The API function has a three-instance scaling cap, but its public endpoint can still consume Gemini quota. Configure billing alerts and review usage in Google Cloud and Gemini. Never commit `.env.local`, Firebase credentials, or API keys.
