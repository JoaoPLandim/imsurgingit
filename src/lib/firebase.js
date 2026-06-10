import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase web config is public by design; env vars allow overriding per environment.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAcngcAInI6mCvj3BotzBsKr0vrPEm6g28",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "uniplanner-785b6.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "uniplanner-785b6",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "uniplanner-785b6.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "242514355323",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:242514355323:web:851a0fa3ee6a59e4672ede",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-H6HCXYJMQ6",
};

// Reuse the existing app instance across hot reloads / server renders
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
