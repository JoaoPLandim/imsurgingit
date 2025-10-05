import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcngcAInI6mCvj3BotzBsKr0vrPEm6g28",
  authDomain: "uniplanner-785b6.firebaseapp.com",
  projectId: "uniplanner-785b6",
  storageBucket: "uniplanner-785b6.firebasestorage.app",
  messagingSenderId: "242514355323",
  appId: "1:242514355323:web:851a0fa3ee6a59e4672ede",
  measurementId: "G-H6HCXYJMQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };