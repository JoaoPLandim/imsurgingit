<<<<<<< HEAD
"use client";

import { signUp, signIn } from "./authService";
=======
import Link from 'next/link';
>>>>>>> origin

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
<<<<<<< HEAD
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
=======

    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <h1 className="text-4xl font-bold text-jet text-center">
          Uniplanner
        </h1>
        <h2 className="text-lg text-jet text-center max-w-xl">
          Built by university students, for university students.
        </h2>
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <div className="flex gap-3">
            <Link href="/sign-up" className="flex-1 px-6 py-3 border border-muted bg-transparent text-foreground rounded-lg hover:bg-muted hover:text-white transition font-medium text-center">
              Sign Up
            </Link>
            <Link href="/sign-in" className="flex-1 px-6 py-3 border border-muted bg-transparent text-foreground rounded-lg hover:bg-muted hover:text-white transition font-medium text-center">
              Sign In
            </Link>
          </div>
          <a href="#" className="text-muted hover:text-foreground transition underline underline-offset-4 text-center">
            Continue as Guest
          </a>
        </div>
      </main>
      </div>
>>>>>>> origin
  );
}
