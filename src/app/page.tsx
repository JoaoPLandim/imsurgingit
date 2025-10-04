"use client";

import { signUp, signIn } from "./authService";

export default function Home() {
  const handleTestSignUp = async () => {
    try {
      await signUp("testuser@example.com", "testpassword123");
      alert("Sign up successful!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleTestSignIn = async () => {
    try {
      await signIn("testuser@example.com", "testpassword123");
      alert("Sign in successful!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Welcome to Uniplanner!
          </li>
          <li className="tracking-[-.01em]">
            Built by university students, for university students.
          </li>
        </ol>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={handleTestSignUp}
          >
            Sign Up
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            onClick={handleTestSignIn}
          >
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
}
