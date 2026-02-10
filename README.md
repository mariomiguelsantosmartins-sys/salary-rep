# SalaryRep

AI-powered salary negotiation simulator. Practice with realistic recruiters, get feedback on your technique, and walk into your next offer conversation with confidence.

## What is this?

SalaryRep lets you practice salary negotiations before the real conversation. Enter your target role, company size, and industry. The AI plays the recruiter, the hiring manager, the HR rep who says "that's outside our budget." You practice holding firm until confidence replaces anxiety.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Font:** Geist (by Vercel)
- **AI:** Anthropic Claude (via Vercel AI SDK v6)
- **Database:** Supabase (lead storage)
- **Payments:** Stripe — coming soon
- **Deployment:** Vercel

## Project structure

```
src/
  app/
    page.tsx          — Landing page
    layout.tsx        — Root layout with metadata
    globals.css       — Design tokens and global styles
    practice/
      page.tsx        — Scenario setup, negotiation chat, and session feedback
    api/
      chat/
        route.ts      — AI chat streaming endpoint
      feedback/
        route.ts      — AI session analysis and structured feedback
      leads/
        route.ts      — Save lead emails to Supabase
  lib/
    supabase.ts       — Supabase client instance
```

## Environment variables

Create a `.env.local` file with:

```
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
