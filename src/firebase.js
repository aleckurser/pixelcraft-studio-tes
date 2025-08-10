// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ඔබේ Firebase Console එකෙන් ගන්න config එක
const firebaseConfig = {
  apiKey: "ඔබගේ_API_KEY",
  authDomain: "ඔබගේ_PROJECT.firebaseapp.com",
  projectId: "ඔබගේ_PROJECT_ID",
  storageBucket: "ඔබගේ_PROJECT.appspot.com",
  messagingSenderId: "XXXXXXX",
  appId: "XXXXXXX"
};

// Firebase app එක initialize කරන්න
const app = initializeApp(firebaseConfig);

// Firebase services export කරන්න
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
