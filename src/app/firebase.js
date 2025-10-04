// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAuth, connectAuthEmulator } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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

export const auth = getAuth(app);

// Connect to Auth Emulator in development
if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
}