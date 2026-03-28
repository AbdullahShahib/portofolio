// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

const requiredConfigKeys = ["apiKey", "authDomain", "projectId", "appId"];
export const isFirebaseConfigured = requiredConfigKeys.every((key) => Boolean(firebaseConfig[key]));

const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;

// Auth
export const auth = app ? getAuth(app) : null;
const provider = auth ? new GoogleAuthProvider() : null;

if (!isFirebaseConfigured) {
  console.warn("Firebase is not configured. Add VITE_FIREBASE_* variables in a .env file.");
}

export const loginWithGoogle = () => {
  if (!auth || !provider) {
    return Promise.reject(new Error("Firebase is not configured."));
  }
  return signInWithPopup(auth, provider);
};

export const logout = () => {
  if (!auth) {
    return Promise.resolve();
  }
  return signOut(auth);
};

// Firestore
export const db = app ? getFirestore(app) : null;
