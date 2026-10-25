(function () {
  "use strict";

  const config = window.CAREERCOMPASS_FIREBASE_CONFIG;
  const status = () => document.getElementById("accountStatus");
  const accountButton = () => document.getElementById("accountButton");
  const syncCollection = userId => firebase.firestore().collection("users").doc(userId).collection("appData");
  const nativeGet = Storage.prototype.getItem;
  const nativeSet = Storage.prototype.setItem;
  const nativeRemove = Storage.prototype.removeItem;
  const pendingWrites = new Map();
  let activeUser = null;
  let isHydrating = false;
  let guestSnapshot = null;
  let formMode = "signin";
  let authGeneration = 0;
  let storageHydrationToken = 0;

  function isSyncedKey(key) {
    return key === "savedCareers"
      || key === "careercompass_saved_careers"
      || key === "careercompass_study_plan_preferences"
      || key.startsWith("careercompass_study_plan_")
      || key.startsWith("prog_");
  }

  function getSyncedKeys() {
    return Object.keys(localStorage).filter(isSyncedKey);
  }

  function documentIdForKey(key) {
    return encodeURIComponent(key).replace(/%/g, "_");
  }

  function enqueueWrite(key, operation) {
    const previous = pendingWrites.get(key) || Promise.resolve();
    const next = previous.catch(() => {}).then(operation);
    pendingWrites.set(key, next);
    next.then(() => {
      if (pendingWrites.get(key) === next) pendingWrites.delete(key);
    }, () => {
      if (pendingWrites.get(key) === next) pendingWrites.delete(key);
    });
    return next;
  }

  function showStatus(message, isError) {
    const element = status();
    if (!element) return;
    element.textContent = message;
    element.classList.toggle("account-error", Boolean(isError));
  }

  function updateAccountButton(user) {
    const button = accountButton();
    if (button) {
      button.textContent = user ? "👤 Account" : "Sign in";
      button.setAttribute("aria-label", user ? `Account: ${user.email}` : "Sign in or create an account");
      button.title = user ? user.email || user.displayName || "Signed in" : "Sign in or create an account";
    }
    const form = document.getElementById("accountForm");
    const signedIn = document.getElementById("accountSignedIn");
    const providers = document.getElementById("accountProviders");
    if (form && signedIn) {
      form.hidden = Boolean(user);
      signedIn.hidden = !user;
      if (providers) providers.hidden = Boolean(user);
      if (user) document.getElementById("accountEmail").textContent = user.email || user.displayName || "Signed in";
    }
  }

  function openAccountModal() {
    const user = window.CAREERCOMPASS_FIREBASE_READY ? firebase.auth().currentUser : null;
    document.getElementById("accountModal").classList.add("open");
    document.getElementById("accountForm").hidden = Boolean(user);
    document.getElementById("accountSignedIn").hidden = !user;
    document.getElementById("accountProviders").hidden = Boolean(user);
    if (user) {
      document.getElementById("accountEmail").textContent = user.email || user.displayName || "Signed in";
      showStatus("Your saved careers and study progress sync to this account.");
    } else if (!window.CAREERCOMPASS_FIREBASE_READY) {
      showStatus("Sign-in is not configured yet. Add the Firebase Web App API key and App ID to firebase-config.js.", true);
    } else {
      showStatus("");
    }
  }

  function closeAccountModal() {
    document.getElementById("accountModal").classList.remove("open");
  }

  function setFormMode(mode) {
    formMode = mode;
    document.getElementById("accountSubmit").textContent = mode === "signup" ? "Create account" : "Sign in";
    document.getElementById("accountModeToggle").textContent = mode === "signup"
      ? "Already have an account? Sign in"
      : "New here? Create an account";
    document.getElementById("accountPassword").autocomplete = mode === "signup" ? "new-password" : "current-password";
    showStatus("");
  }

  function describeAuthError(error) {
    const messages = {
      "auth/email-already-in-use": "An account already exists for this email. Try signing in.",
      "auth/invalid-email": "Enter a valid email address.",
      "auth/invalid-credential": "Email or password is incorrect. If you have not registered yet, choose “New here? Create an account”.",
      "auth/invalid-login-credentials": "Email or password is incorrect. If you have not registered yet, choose “New here? Create an account”.",
      "auth/user-not-found": "No account was found. Choose “New here? Create an account” to register first.",
      "auth/wrong-password": "The password is incorrect. Check it or use “Reset password”.",
      "auth/weak-password": "Choose a password with at least 6 characters.",
      "auth/too-many-requests": "There have been too many attempts. Wait a while, then try again or reset your password.",
      "auth/user-disabled": "This account has been disabled. Contact the site administrator.",
      "auth/popup-closed-by-user": "The Google sign-in window was closed before completing sign-in.",
      "auth/operation-not-allowed": "This sign-in method is not enabled in Firebase Authentication.",
      "auth/unauthorized-domain": "Add this website's domain to the authorized domains in Firebase Authentication.",
      "auth/network-request-failed": "Could not reach Firebase. Check your internet connection and try again.",
      "auth/api-key-not-valid.-please-pass-a-valid-api-key.": "The Firebase Web API key is invalid. Check the Firebase Web App configuration in firebase-config.js.",
      "auth/invalid-api-key": "The Firebase Web API key is invalid. Check the Firebase Web App configuration in firebase-config.js.",
      "auth/app-not-authorized": "This app is not authorized for the Firebase API key. Check the key restrictions in Google Cloud Console.",
      "auth/configuration-not-found": "Firebase Authentication is not configured for this project. Enable it in the Firebase Console."
    };
    return messages[error.code] || `Authentication failed (${error.code || "unknown error"}). Check Firebase Authentication settings and try again.`;
  }

  async function submitAccountForm(event) {
    event.preventDefault();
    if (!window.CAREERCOMPASS_FIREBASE_READY) {
      showStatus("Firebase sign-in is not configured. Follow FIREBASE-DEPLOY.md to finish setup.", true);
      return;
    }
    const email = document.getElementById("accountEmailInput").value.trim();
    const password = document.getElementById("accountPassword").value;
    const button = document.getElementById("accountSubmit");
    button.disabled = true;
    showStatus(formMode === "signup" ? "Creating your account…" : "Signing in…");
    try {
      if (formMode === "signup") {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
      } else {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      }
      document.getElementById("accountPassword").value = "";
      showStatus("Signed in. Syncing your saved data…");
    } catch (error) {
      console.error("Firebase email sign-in failed:", error);
      showStatus(describeAuthError(error), true);
    } finally {
      button.disabled = false;
    }
  }

  async function signInWithGoogle() {
    if (!window.CAREERCOMPASS_FIREBASE_READY) {
      showStatus("Firebase sign-in is not configured. Follow FIREBASE-DEPLOY.md to finish setup.", true);
      return;
    }
    try {
      showStatus("Opening Google sign-in…");
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      showStatus("Signed in. Syncing your saved data…");
    } catch (error) {
      console.error("Google sign-in failed:", error);
      showStatus(describeAuthError(error), true);
    }
  }

  async function resetPassword() {
    if (!window.CAREERCOMPASS_FIREBASE_READY) {
      showStatus("Firebase sign-in is not configured. Follow FIREBASE-DEPLOY.md to finish setup.", true);
      return;
    }
    const email = document.getElementById("accountEmailInput").value.trim();
    if (!email) {
      showStatus("Enter your email above, then choose reset password.", true);
      return;
    }
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      showStatus("If an account exists for that email, Firebase will send a password reset link.");
    } catch (error) {
      console.error("Password reset email failed:", error);
      showStatus(describeAuthError(error), true);
    }
  }

  async function signOut() {
    try {
      await firebase.auth().signOut();
      closeAccountModal();
    } catch (error) {
      console.error("Firebase sign-out failed:", error);
      showStatus("Could not sign out. Please try again.", true);
    }
  }

  async function syncUserData(user, generation) {
    const collection = syncCollection(user.uid);
    const snapshot = await collection.get();
    if (generation !== authGeneration) return false;
    const cloudData = new Map(snapshot.docs.map(document => [document.data().key, document.data().value]));
    const hydrationToken = ++storageHydrationToken;
    isHydrating = true;
    try {
      const localKeys = getSyncedKeys();
      for (const key of new Set([...localKeys, ...cloudData.keys()])) {
        if (generation !== authGeneration) return false;
        if (!isSyncedKey(key)) continue;
        if (cloudData.has(key)) {
          nativeSet.call(localStorage, key, cloudData.get(key));
        } else {
          const localValue = nativeGet.call(localStorage, key);
          if (localValue !== null) {
            await collection.doc(documentIdForKey(key)).set({
              key,
              value: localValue,
              updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
          }
        }
      }
    } finally {
      if (hydrationToken === storageHydrationToken) isHydrating = false;
    }
    return generation === authGeneration;
  }

  function saveSyncedValue(key, value) {
    if (!activeUser || isHydrating || !isSyncedKey(key)) return;
    const collection = syncCollection(activeUser.uid);
    enqueueWrite(key, () => collection.doc(documentIdForKey(key))
      .set({ key, value, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }))
      .catch(error => {
        console.error(`Could not sync ${key} to Firestore:`, error);
        showStatus("Saved on this device, but cloud sync failed. Check your connection and Firestore rules.", true);
      });
  }

  function removeSyncedValue(key) {
    if (!activeUser || isHydrating || !isSyncedKey(key)) return;
    const collection = syncCollection(activeUser.uid);
    enqueueWrite(key, () => collection.doc(documentIdForKey(key)).delete()).catch(error => {
      console.error(`Could not remove ${key} from Firestore:`, error);
      showStatus("Removed on this device, but cloud sync failed. Check your connection and Firestore rules.", true);
    });
  }

  function captureGuestData() {
    if (guestSnapshot) return;
    guestSnapshot = new Map(getSyncedKeys().map(key => [key, nativeGet.call(localStorage, key)]));
  }

  function restoreGuestData() {
    if (!guestSnapshot) return;
    const hydrationToken = ++storageHydrationToken;
    isHydrating = true;
    try {
      for (const key of getSyncedKeys()) nativeRemove.call(localStorage, key);
      for (const [key, value] of guestSnapshot) {
        if (value !== null) nativeSet.call(localStorage, key, value);
      }
    } finally {
      if (hydrationToken === storageHydrationToken) isHydrating = false;
      guestSnapshot = null;
    }
  }

  function installStorageSync() {
    Storage.prototype.setItem = function (key, value) {
      nativeSet.call(this, key, value);
      if (this === localStorage) saveSyncedValue(String(key), String(value));
    };
    Storage.prototype.removeItem = function (key) {
      nativeRemove.call(this, key);
      if (this === localStorage) removeSyncedValue(String(key));
    };
  }

  function onAuthStateChanged(user) {
    const generation = ++authGeneration;
    activeUser = null;
    if (!user) {
      restoreGuestData();
      updateAccountButton(null);
      showStatus("");
      window.dispatchEvent(new CustomEvent("careercompass:account-ready", { detail: { user: null } }));
      return;
    }
    captureGuestData();
    showStatus("Syncing your saved data…");
    syncUserData(user, generation).then(synced => {
      if (!synced || generation !== authGeneration) return;
      activeUser = user;
      updateAccountButton(user);
      showStatus("Signed in and synced.");
      window.dispatchEvent(new CustomEvent("careercompass:account-ready", { detail: { user } }));
    }).catch(error => {
      if (generation !== authGeneration) return;
      console.error("Could not load account data from Firestore:", error);
      activeUser = user;
      updateAccountButton(user);
      showStatus("Signed in, but cloud sync failed. Check Firestore setup and security rules.", true);
      window.dispatchEvent(new CustomEvent("careercompass:account-ready", { detail: { user, syncError: true } }));
    });
  }

  function initialize() {
    installStorageSync();
    updateAccountButton(null);
    if (!config || !config.apiKey || config.apiKey.startsWith("REPLACE_") || !config.appId || config.appId.startsWith("REPLACE_")) {
      window.CAREERCOMPASS_FIREBASE_READY = false;
      showStatus("Firebase Web App configuration is required to enable sign-in.");
      return;
    }
    if (!window.firebase || !window.firebase.auth || !window.firebase.firestore) {
      window.CAREERCOMPASS_FIREBASE_READY = false;
      showStatus("Firebase SDK could not load. Check your internet connection and reload.", true);
      return;
    }
    firebase.initializeApp(config);
    window.CAREERCOMPASS_FIREBASE_READY = true;
    firebase.auth().onAuthStateChanged(onAuthStateChanged, error => {
      console.error("Firebase authentication state could not be loaded:", error);
      showStatus("Could not connect to Firebase Authentication. Check the Firebase Web App configuration.", true);
    });
  }

  window.openAccountModal = openAccountModal;
  window.closeAccountModal = closeAccountModal;
  window.setAccountFormMode = setFormMode;
  window.submitAccountForm = submitAccountForm;
  window.signInWithGoogle = signInWithGoogle;
  window.resetAccountPassword = resetPassword;
  window.signOutCareerCompass = signOut;
  window.addEventListener("DOMContentLoaded", initialize, { once: true });
})();
