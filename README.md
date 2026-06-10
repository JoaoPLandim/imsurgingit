# Uniplanner

An AI-powered academic planner for Simon Fraser University students. Upload your transcript, chat with an AI advisor, and get personalized course recommendations backed by live SFU course-outline data.

Built with [Next.js 15](https://nextjs.org) (App Router), [Firebase](https://firebase.google.com) (Auth + Firestore), and [Google Gemini](https://ai.google.dev).

## Features

- **AI academic advisor** — chat about courses, schedules, prerequisites, and requirements (`/planner`)
- **Transcript analysis** — upload a PDF, image, or text transcript and get a structured breakdown (program, GPA, credits, completed courses)
- **Live SFU course data** — pulls current-term course outlines from the SFU Course Outlines API
- **Accounts optional** — sign up with email/password (Firebase Auth) or continue as a guest

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and set your Gemini API key (get one at [Google AI Studio](https://aistudio.google.com/apikey)):

   ```bash
   GEMINI_API_KEY=your-key-here
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Import this repository at [vercel.com/new](https://vercel.com/new) (framework preset: **Next.js**, no build settings needed), or run `npx vercel` from the repo root.
2. Add the `GEMINI_API_KEY` environment variable in the Vercel project settings (Settings → Environment Variables) for Production, Preview, and Development.
3. Deploy. AI routes are configured with a 60-second max duration (`src/app/api/gemini/*`), which fits within the Hobby plan limit.
4. After the first deploy, add your Vercel domain (e.g. `your-app.vercel.app`) to **Firebase Console → Authentication → Settings → Authorized domains** so sign-in works in production.

## Project Structure

```
src/
  app/
    page.tsx                  # Landing page
    sign-in/ sign-up/         # Firebase email/password auth
    planner/                  # AI chat + transcript upload
    api/
      gemini/chat/            # AI advisor chat endpoint
      gemini/analyze-transcript/  # Transcript analysis (PDF/image/text)
      sfu/courses/ departments/   # SFU course-outline proxy endpoints
  lib/
    firebase.js               # Firebase app/auth/Firestore init
    authService.js            # Auth + Firestore helpers
    geminiService.js          # Gemini API client
    sfuApi.js                 # SFU Course Outlines API client
```

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `GEMINI_API_KEY` | Yes | Google Gemini API key (server-side only) |
| `NEXT_PUBLIC_FIREBASE_*` | No | Override the default Firebase project (see `.env.example`) |
