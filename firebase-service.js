// CareerCompass Firebase Service
// Handles Google Authentication, Firestore cloud sync for student data, and real-time state.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let app = null;
let auth = null;
let db = null;
let googleProvider = null;
let currentUser = null;
let isConfigured = false;

// Keys stored in Firestore for a student
const STORAGE_KEYS = {
  savedCareers: "careercompass_saved_careers",
  quizResult: "careercompass_interest_quiz_result",
  roadmapProgress: "careercompass_roadmap_progress",
  studyPlan: "careercompass_study_plan",
  moodHistory: "careercompass_mood_history",
  studentProfile: "careercompass_last_profile"
};

function getActiveConfig() {
  try {
    const custom = localStorage.getItem("careercompass_firebase_config");
    if (custom) {
      const parsed = JSON.parse(custom);
      if (parsed && parsed.apiKey && !parsed.apiKey.includes("YOUR_")) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Could not parse custom Firebase config:", e);
  }

  const baseConfig = window.CAREERCOMPASS_FIREBASE_CONFIG || window.FIREBASE_CONFIG || {};
  if (baseConfig.apiKey && !baseConfig.apiKey.includes("YOUR_")) {
    return baseConfig;
  }
  return null;
}

export function initFirebase() {
  const config = getActiveConfig();
  if (!config) {
    isConfigured = false;
    updateAuthUI(null, false);
    return false;
  }

  try {
    app = initializeApp(config);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: "select_account" });
    isConfigured = true;

    onAuthStateChanged(auth, async (user) => {
      currentUser = user;
      updateAuthUI(user, true);
      if (user) {
        await handleUserSignedIn(user);
      }
      document.dispatchEvent(new CustomEvent("careercompass:authchange", { detail: { user } }));
    });

    return true;
  } catch (err) {
    console.error("Firebase initialization failed:", err);
    isConfigured = false;
    updateAuthUI(null, false, err.message);
    return false;
  }
}

// Update Top-Bar Auth UI
function updateAuthUI(user, configured, errorMsg) {
  const container = document.getElementById("firebaseAuthSection");
  if (!container) return;

  if (!configured) {
    container.innerHTML = `
      <button type="button" class="firebase-auth-btn configure-btn" onclick="openFirebaseSettingsModal()" title="Firebase is not configured yet. Click to enter your Firebase project credentials.">
        <span class="auth-icon">🔥</span>
        <span>Connect Firebase</span>
      </button>
    `;
    return;
  }

  if (user) {
    const avatar = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "Student")}&background=F2C36B&color=0A1220`;
    const name = user.displayName ? user.displayName.split(" ")[0] : "Student";

    container.innerHTML = `
      <div class="user-chip-container">
        <div class="user-profile-chip" title="Signed in as ${escapeHtml(user.email || user.displayName)}">
          <img src="${escapeHtml(avatar)}" alt="${escapeHtml(name)}" class="user-avatar" referrerpolicy="no-referrer">
          <span class="user-name">${escapeHtml(name)}</span>
          <span class="cloud-sync-badge" id="cloudSyncIndicator" title="Data synchronized with Firebase Firestore">☁️ Synced</span>
        </div>
        <button type="button" class="settings-link-btn auth-logout-btn" onclick="window.CareerCompassFirebase.signOut()" title="Sign out of Firebase">Log out</button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <button type="button" class="firebase-auth-btn google-sign-in-btn" onclick="window.CareerCompassFirebase.signIn()" title="Sign in with your Google account to back up and sync your career progress.">
        <svg class="google-icon" viewBox="0 0 24 24" width="16" height="16">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
        <span>Sign in with Google</span>
      </button>
    `;
  }
}

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}

// User Signed In: Load Cloud Data and Merge with Local
async function handleUserSignedIn(user) {
  setSyncStatus("Syncing...");
  try {
    const studentRef = doc(db, "students", user.uid);
    const snap = await getDoc(studentRef);

    if (snap.exists()) {
      const data = snap.data();
      // Apply cloud data to local storage if present
      let changed = false;

      for (const [field, localKey] of Object.entries(STORAGE_KEYS)) {
        if (data[field] !== undefined) {
          try {
            const cloudVal = typeof data[field] === "string" ? data[field] : JSON.stringify(data[field]);
            const currentLocal = localStorage.getItem(localKey);
            // If local is empty or differs, use cloud
            if (!currentLocal || currentLocal !== cloudVal) {
              localStorage.setItem(localKey, cloudVal);
              changed = true;
            }
          } catch (e) {}
        }
      }

      // If user had local data that cloud lacks, upload merged
      await syncAllLocalDataToCloud(false);

      if (changed) {
        // Refresh visible UI
        if (typeof window.displaySavedCareers === "function") window.displaySavedCareers();
        if (typeof window.renderSavedCareers === "function") window.renderSavedCareers();
      }
    } else {
      // First time sign-in: Initialize student profile in Firestore
      await setDoc(studentRef, {
        uid: user.uid,
        email: user.email || "",
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        ...gatherAllLocalData()
      });
    }

    setSyncStatus("☁️ Synced");
    showNotification(`Welcome, ${user.displayName || "Student"}! Your data is backed up to the cloud.`);
  } catch (err) {
    console.error("Error during student data sync:", err);
    setSyncStatus("Sync error");
  }
}

function gatherAllLocalData() {
  const payload = {};
  for (const [field, localKey] of Object.entries(STORAGE_KEYS)) {
    try {
      const raw = localStorage.getItem(localKey);
      if (raw) {
        payload[field] = JSON.parse(raw);
      }
    } catch (e) {
      payload[field] = localStorage.getItem(localKey);
    }
  }
  return payload;
}

export async function syncAllLocalDataToCloud(notify = true) {
  if (!currentUser || !db) return;
  setSyncStatus("Saving...");
  try {
    const studentRef = doc(db, "students", currentUser.uid);
    const payload = {
      uid: currentUser.uid,
      email: currentUser.email || "",
      displayName: currentUser.displayName || "",
      photoURL: currentUser.photoURL || "",
      lastUpdatedAt: new Date().toISOString(),
      ...gatherAllLocalData()
    };
    await setDoc(studentRef, payload, { merge: true });
    setSyncStatus("☁️ Synced");
    if (notify) showNotification("Cloud sync complete!");
  } catch (err) {
    console.error("Failed to sync local data to cloud:", err);
    setSyncStatus("Sync error");
  }
}

export async function saveStudentDataField(fieldName, value) {
  if (!currentUser || !db) return;
  setSyncStatus("Saving...");
  try {
    const studentRef = doc(db, "students", currentUser.uid);
    await updateDoc(studentRef, {
      [fieldName]: value,
      lastUpdatedAt: new Date().toISOString()
    });
    setSyncStatus("☁️ Synced");
  } catch (err) {
    console.error(`Failed to update ${fieldName}:`, err);
    setSyncStatus("Sync error");
  }
}

function setSyncStatus(text) {
  const badge = document.getElementById("cloudSyncIndicator");
  if (badge) {
    badge.textContent = text;
    if (text === "Saving...") {
      badge.style.opacity = "0.7";
    } else {
      badge.style.opacity = "1";
    }
  }
}

function showNotification(msg) {
  if (typeof window.showSuccess === "function") {
    window.showSuccess(msg);
  } else {
    console.log("[Firebase notification]", msg);
  }
}

// Public API
export async function signIn() {
  if (!isConfigured) {
    openFirebaseSettingsModal();
    return;
  }
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error("Google sign-in error:", err);
    alert("Sign-in failed: " + (err.message || err.code));
  }
}

export async function signOutUser() {
  if (!auth) return;
  try {
    await signOut(auth);
    currentUser = null;
    updateAuthUI(null, isConfigured);
    showNotification("You have signed out.");
  } catch (err) {
    console.error("Sign-out error:", err);
  }
}

export function openFirebaseSettingsModal() {
  const modal = document.getElementById("firebaseConfigModal");
  if (modal) {
    loadFirebaseFormFields();
    modal.classList.add("open");
  }
}

export function closeFirebaseSettingsModal() {
  const modal = document.getElementById("firebaseConfigModal");
  if (modal) modal.classList.remove("open");
}

export function saveFirebaseConfigFromUI(configObj) {
  try {
    localStorage.setItem("careercompass_firebase_config", JSON.stringify(configObj));
    closeFirebaseSettingsModal();
    showNotification("Firebase credentials saved! Initializing...");
    initFirebase();
  } catch (e) {
    alert("Could not save Firebase credentials: " + e.message);
  }
}

export function clearFirebaseConfig() {
  localStorage.removeItem("careercompass_firebase_config");
  closeFirebaseSettingsModal();
  showNotification("Custom Firebase credentials cleared.");
  initFirebase();
}

function loadFirebaseFormFields() {
  const config = getActiveConfig() || {};
  const map = {
    fbApiKey: config.apiKey || "",
    fbAuthDomain: config.authDomain || "",
    fbProjectId: config.projectId || "",
    fbStorageBucket: config.storageBucket || "",
    fbMessagingSenderId: config.messagingSenderId || "",
    fbAppId: config.appId || ""
  };
  for (const [id, val] of Object.entries(map)) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  }
}

// Attach globally
window.CareerCompassFirebase = {
  signIn,
  signOut: signOutUser,
  syncAll: syncAllLocalDataToCloud,
  saveField: saveStudentDataField,
  init: initFirebase,
  getUser: () => currentUser,
  isConfigured: () => isConfigured,
  openConfig: openFirebaseSettingsModal,
  closeConfig: closeFirebaseSettingsModal,
  saveConfig: saveFirebaseConfigFromUI,
  clearConfig: clearFirebaseConfig
};

// Auto-initialize on load
window.addEventListener("DOMContentLoaded", () => {
  initFirebase();
});
