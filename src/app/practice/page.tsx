"use client";

import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useState, useRef, useEffect, useMemo } from "react";
import type { Feedback } from "@/app/api/feedback/route";

const industries = [
  "Technology",
  "Finance & Banking",
  "Healthcare",
  "Consulting",
  "Marketing & Advertising",
  "Education",
  "Manufacturing",
  "Retail & E-commerce",
  "Legal",
  "Other",
];

const companySizes = [
  "Startup (1-50)",
  "Small (51-200)",
  "Mid-size (201-1,000)",
  "Large (1,001-10,000)",
  "Enterprise (10,000+)",
];

const experienceLevels = [
  "Entry-level (0-2 years)",
  "Mid-level (3-5 years)",
  "Senior (6-10 years)",
  "Lead / Principal (10+ years)",
  "Executive / C-Suite",
];

const negotiationPersonas = [
  {
    id: "friendly-recruiter",
    label: "Friendly Recruiter",
    description:
      "Warm and helpful, but still has a budget to stick to. A good starting point.",
  },
  {
    id: "tough-hiring-manager",
    label: "Tough Hiring Manager",
    description:
      "Direct and firm. Will push back hard on your number and use internal equity arguments.",
  },
  {
    id: "hr-budget-holder",
    label: "HR Budget Holder",
    description:
      'The classic "that\'s outside our budget" persona. Will test your ability to hold firm.',
  },
];

type Scenario = {
  role: string;
  targetSalary: string;
  industry: string;
  companySize: string;
  experience: string;
  persona: string;
};

function getTextFromMessage(message: {
  parts: Array<{ type: string; text?: string }>;
}): string {
  return message.parts
    .filter(
      (part): part is { type: "text"; text: string } => part.type === "text"
    )
    .map((part) => part.text)
    .join("");
}

/* ------------------------------------------------------------------ */
/*  Setup Form                                                        */
/* ------------------------------------------------------------------ */

function SetupForm({ onStart }: { onStart: (scenario: Scenario) => void }) {
  const [role, setRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [experience, setExperience] = useState("");
  const [persona, setPersona] = useState("friendly-recruiter");
  const [targetSalary, setTargetSalary] = useState("");

  const isFormValid =
    role.trim() && industry && companySize && experience && targetSalary.trim();

  return (
    <main className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">
        Set up your scenario
      </h1>
      <p className="mb-10 text-muted">
        Tell us about the role you&rsquo;re negotiating for. We&rsquo;ll build a
        realistic conversation around it.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isFormValid) return;
          onStart({
            role,
            targetSalary,
            industry,
            companySize,
            experience,
            persona,
          });
        }}
        className="space-y-8"
      >
        <div>
          <label htmlFor="role" className="mb-2 block text-sm font-medium">
            Target role
          </label>
          <input
            id="role"
            type="text"
            placeholder="e.g. Senior Software Engineer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="h-12 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="salary" className="mb-2 block text-sm font-medium">
            Target salary (annual)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-sm text-muted">
              $
            </span>
            <input
              id="salary"
              type="text"
              inputMode="numeric"
              placeholder="120,000"
              value={targetSalary}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                if (raw) {
                  setTargetSalary(Number(raw).toLocaleString("en-US"));
                } else {
                  setTargetSalary("");
                }
              }}
              className="h-12 w-full rounded-xl border border-border bg-card pl-8 pr-4 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="industry" className="mb-2 block text-sm font-medium">
            Industry
          </label>
          <select
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="h-12 w-full appearance-none rounded-xl border border-border bg-card px-4 text-sm outline-none transition-colors focus:border-accent"
          >
            <option value="" disabled>
              Select an industry
            </option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="company-size"
            className="mb-2 block text-sm font-medium"
          >
            Company size
          </label>
          <select
            id="company-size"
            value={companySize}
            onChange={(e) => setCompanySize(e.target.value)}
            className="h-12 w-full appearance-none rounded-xl border border-border bg-card px-4 text-sm outline-none transition-colors focus:border-accent"
          >
            <option value="" disabled>
              Select company size
            </option>
            {companySizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="experience"
            className="mb-2 block text-sm font-medium"
          >
            Your experience level
          </label>
          <select
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="h-12 w-full appearance-none rounded-xl border border-border bg-card px-4 text-sm outline-none transition-colors focus:border-accent"
          >
            <option value="" disabled>
              Select experience level
            </option>
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="mb-3 text-sm font-medium">
            Who are you negotiating with?
          </legend>
          <div className="space-y-3">
            {negotiationPersonas.map((p) => (
              <label
                key={p.id}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                  persona === p.id
                    ? "border-accent bg-accent-light"
                    : "border-border bg-card hover:border-accent/30"
                }`}
              >
                <input
                  type="radio"
                  name="persona"
                  value={p.id}
                  checked={persona === p.id}
                  onChange={(e) => setPersona(e.target.value)}
                  className="mt-0.5 accent-accent"
                />
                <div>
                  <span className="block text-sm font-medium">{p.label}</span>
                  <span className="block text-sm text-muted">
                    {p.description}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={!isFormValid}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent text-base font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          Start negotiation
        </button>
      </form>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Coaching Hint                                                     */
/* ------------------------------------------------------------------ */

function CoachingHint({
  messageCount,
  targetSalary,
}: {
  messageCount: number;
  targetSalary: string;
}) {
  const hints = [
    `Their offer is below your $${targetSalary} target. Counter with your number and explain why you're worth it — mention experience, skills, or market data.`,
    "They pushed back. Stay firm — restate your value and ask what flexibility they have. Don't apologize for your ask.",
    "Good back-and-forth. Consider negotiating beyond base salary — ask about equity, signing bonus, or an earlier performance review.",
    "You're deep in the negotiation. Hold your ground or find a creative compromise. When you're ready, click \"End session & get feedback\" above.",
  ];

  const hintIndex = Math.min(Math.floor((messageCount - 2) / 2), hints.length - 1);

  return (
    <div className="border-t border-border bg-accent-light px-6 py-3">
      <p className="mx-auto max-w-2xl text-xs leading-relaxed text-accent">
        <span className="font-semibold">Tip: </span>
        {hints[hintIndex]}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Negotiation Chat                                                  */
/* ------------------------------------------------------------------ */

function NegotiationChat({
  scenario,
  onReset,
  onEndSession,
}: {
  scenario: Scenario;
  onReset: () => void;
  onEndSession: (messages: UIMessage[]) => void;
}) {
  const [input, setInput] = useState("");
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: { scenario } }),
    [scenario]
  );
  const { messages, sendMessage, status, error } = useChat({
    transport,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasSentOpener = useRef(false);

  const isActive = status === "streaming" || status === "submitted";
  const hasEnoughMessages = messages.length >= 3;

  useEffect(() => {
    if (!hasSentOpener.current) {
      hasSentOpener.current = true;
      sendMessage({
        text: `Hi, I'm excited about the ${scenario.role} opportunity. I'd love to discuss the compensation package.`,
      });
    }
  }, [sendMessage, scenario.role]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isActive) {
      inputRef.current?.focus();
    }
  }, [isActive]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isActive) return;
    setInput("");
    await sendMessage({ text });
  };

  const personaLabel =
    negotiationPersonas.find((p) => p.id === scenario.persona)?.label ??
    "Recruiter";

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Chat header */}
      <div className="border-b border-border px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">{personaLabel}</h2>
            <p className="text-xs text-muted">
              {scenario.role} &middot; {scenario.industry} &middot; Target: $
              {scenario.targetSalary}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {hasEnoughMessages && (
              <button
                onClick={() => onEndSession(messages)}
                disabled={isActive}
                className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
              >
                End session &amp; get feedback
              </button>
            )}
            <button
              onClick={onReset}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-card-hover"
            >
              New scenario
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mx-auto max-w-2xl space-y-6">
          {messages.map((message) => {
            const text = getTextFromMessage(message);
            if (!text) return null;

            return (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-accent text-white"
                      : "border border-border bg-card"
                  }`}
                >
                  {message.role === "assistant" && (
                    <p className="mb-1 text-xs font-medium text-accent">
                      {personaLabel}
                    </p>
                  )}
                  {text}
                </div>
              </div>
            );
          })}

          {isActive &&
            messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-border bg-card px-4 py-3">
                  <p className="mb-1 text-xs font-medium text-accent">
                    {personaLabel}
                  </p>
                  <span className="text-sm text-muted">Typing...</span>
                </div>
              </div>
            )}

          {error && (
            <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
              Something went wrong. Please try again.
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Coaching hint */}
      {!isActive && !input && messages.length >= 2 && (
        <CoachingHint messageCount={messages.length} targetSalary={scenario.targetSalary} />
      )}

      {/* Input */}
      <div className="border-t border-border px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your response..."
            disabled={isActive}
            className="h-12 flex-1 rounded-xl border border-border bg-card px-4 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent disabled:opacity-50"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={isActive || !input.trim()}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Score Ring                                                        */
/* ------------------------------------------------------------------ */

function ScoreRing({ score }: { score: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 10) * circumference;
  const color =
    score >= 8
      ? "text-green-500"
      : score >= 5
        ? "text-yellow-500"
        : "text-red-500";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="100" height="100" className="-rotate-90" aria-hidden="true">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-border"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className={color}
        />
      </svg>
      <span className="absolute text-2xl font-bold">{score}</span>
      <span className="absolute mt-8 text-xs text-muted">/10</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Session Feedback                                                  */
/* ------------------------------------------------------------------ */

function SessionFeedback({
  feedback,
  onTryAgain,
  onNewScenario,
}: {
  feedback: Feedback;
  onTryAgain: () => void;
  onNewScenario: () => void;
}) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
      {/* Header + Score */}
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
          Session Feedback
        </p>
        <h1 className="mb-6 text-3xl font-bold tracking-tight">
          Here&rsquo;s how you did
        </h1>
        <ScoreRing score={feedback.overallScore} />
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div>
            <span className="text-muted">Target</span>
            <p className="font-semibold">{feedback.targetSalary.replace(/^\$+/, "$")}</p>
          </div>
          <div className="h-8 w-px bg-border" aria-hidden="true" />
          <div>
            <span className="text-muted">Final offer</span>
            <p className="font-semibold">{feedback.finalOffer.replace(/^\$+/, "$")}</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-8 rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-muted">
          Summary
        </h2>
        <p className="text-sm leading-relaxed">{feedback.summary}</p>
      </div>

      {/* Strengths */}
      <div className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted">
          <svg
            className="h-4 w-4 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
          What you did well
        </h2>
        <div className="space-y-4">
          {feedback.strengths.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <p className="mb-2 text-sm font-medium">{s.point}</p>
              <p className="border-l-2 border-accent pl-3 text-sm italic text-muted">
                &ldquo;{s.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Weaknesses */}
      <div className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted">
          <svg
            className="h-4 w-4 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
          Where you can improve
        </h2>
        <div className="space-y-4">
          {feedback.weaknesses.map((w, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <p className="mb-2 text-sm font-medium">{w.point}</p>
              <p className="mb-3 border-l-2 border-yellow-500 pl-3 text-sm italic text-muted">
                &ldquo;{w.quote}&rdquo;
              </p>
              <p className="text-sm">
                <span className="font-medium text-accent">Try instead: </span>
                {w.suggestion}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted">
          <svg
            className="h-4 w-4 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
          </svg>
          Tips for next time
        </h2>
        <div className="space-y-3">
          {feedback.tips.map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-light font-mono text-xs font-bold text-accent">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onTryAgain}
          className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-accent text-base font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Try same scenario again
        </button>
        <button
          onClick={onNewScenario}
          className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-border text-base font-medium transition-colors hover:bg-card-hover"
        >
          New scenario
        </button>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Email Capture                                                     */
/* ------------------------------------------------------------------ */

const FREE_SESSION_LIMIT = 3;
const STORAGE_KEY_EMAIL = "salaryrep_email";
const STORAGE_KEY_NAME = "salaryrep_name";
const STORAGE_KEY_SESSIONS = "salaryrep_sessions";

function getStoredEmail(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY_EMAIL);
}

function getSessionCount(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(STORAGE_KEY_SESSIONS) || "0", 10);
}

function incrementSessionCount(): void {
  const current = getSessionCount();
  localStorage.setItem(STORAGE_KEY_SESSIONS, String(current + 1));
}

function EmailCapture({ onComplete }: { onComplete: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  const isValid = name.trim() && email.trim() && email.includes("@");

  return (
    <main className="mx-auto max-w-md px-6 py-20 sm:py-28">
      <div className="text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
          Free trial
        </p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          Start practicing
        </h1>
        <p className="mb-10 text-muted">
          Enter your name and email to unlock {FREE_SESSION_LIMIT} free
          negotiation sessions with AI-powered feedback.
        </p>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!isValid || saving) return;
          setSaving(true);
          localStorage.setItem(STORAGE_KEY_NAME, name.trim());
          localStorage.setItem(STORAGE_KEY_EMAIL, email.trim());
          try {
            await fetch("/api/leads", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name: name.trim(), email: email.trim() }),
            });
          } catch {
            // Supabase save failed silently — localStorage still works as fallback
          }
          onComplete();
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            First name
          </label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Alex"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="alex@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
        </div>
        <button
          type="submit"
          disabled={!isValid || saving}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent text-base font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Starting..." : "Unlock free sessions"}
        </button>
        <p className="text-center text-xs text-muted">
          No credit card required. We&rsquo;ll only email you if you ask us to.
        </p>
      </form>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Upgrade Wall                                                      */
/* ------------------------------------------------------------------ */

function UpgradeWall() {
  return (
    <main className="mx-auto max-w-lg px-6 py-20 sm:py-28">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent-light">
          <svg
            className="h-7 w-7 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          You&rsquo;ve used your free sessions
        </h1>
        <p className="mb-8 text-muted">
          You completed {FREE_SESSION_LIMIT} practice negotiations — great
          start. Upgrade to keep building your confidence with unlimited
          sessions and deeper coaching.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-accent bg-accent-light p-6">
          <div className="mb-1 flex items-baseline justify-between">
            <h3 className="text-lg font-semibold">Basic</h3>
            <span className="text-lg font-bold">
              $9.99<span className="text-sm font-normal text-muted">/mo</span>
            </span>
          </div>
          <p className="mb-4 text-sm text-muted">
            Unlimited sessions, all personas, detailed feedback, session
            history.
          </p>
          <button className="inline-flex h-11 w-full items-center justify-center rounded-full bg-accent text-sm font-medium text-white transition-colors hover:bg-accent-hover">
            Upgrade to Basic
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-1 flex items-baseline justify-between">
            <h3 className="text-lg font-semibold">Pro</h3>
            <span className="text-lg font-bold">
              $29.99<span className="text-sm font-normal text-muted">/mo</span>
            </span>
          </div>
          <p className="mb-4 text-sm text-muted">
            Everything in Basic plus personalized coaching, advanced analytics,
            and industry-specific scenarios.
          </p>
          <button className="inline-flex h-11 w-full items-center justify-center rounded-full border border-border text-sm font-medium transition-colors hover:bg-card-hover">
            Upgrade to Pro
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        Payment coming soon. Leave your email and we&rsquo;ll notify you when
        plans are available.
      </p>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Root                                                         */
/* ------------------------------------------------------------------ */

type View =
  | { step: "email-capture" }
  | { step: "setup" }
  | { step: "chat"; scenario: Scenario }
  | { step: "loading-feedback"; scenario: Scenario }
  | { step: "feedback"; scenario: Scenario; feedback: Feedback }
  | { step: "feedback-error"; scenario: Scenario }
  | { step: "upgrade" };

export default function PracticePage() {
  const [view, setView] = useState<View>({ step: "email-capture" });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hasEmail = getStoredEmail();
    const sessions = getSessionCount();

    if (!hasEmail) {
      setView({ step: "email-capture" });
    } else if (sessions >= FREE_SESSION_LIMIT) {
      setView({ step: "upgrade" });
    } else {
      setView({ step: "setup" });
    }
    setReady(true);
  }, []);

  const handleEmailComplete = () => {
    setView({ step: "setup" });
  };

  const handleFeedbackViewed = (scenario: Scenario, feedback: Feedback) => {
    incrementSessionCount();
    setView({ step: "feedback", scenario, feedback });
  };

  const handleStartNew = () => {
    if (getSessionCount() >= FREE_SESSION_LIMIT) {
      setView({ step: "upgrade" });
    } else {
      setView({ step: "setup" });
    }
  };

  const handleEndSession = async (
    scenario: Scenario,
    messages: UIMessage[]
  ) => {
    setView({ step: "loading-feedback", scenario });

    const serialized = messages.map((m) => ({
      role: m.role,
      content: getTextFromMessage(m),
    }));

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: serialized, scenario }),
      });

      if (!res.ok) throw new Error("Feedback request failed");

      const feedback: Feedback = await res.json();
      handleFeedbackViewed(scenario, feedback);
    } catch {
      setView({ step: "feedback-error", scenario });
    }
  };

  if (!ready) return null;

  const sessionsRemaining = FREE_SESSION_LIMIT - getSessionCount();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            SalaryRep
          </Link>
          {view.step !== "email-capture" && view.step !== "upgrade" && (
            <span className="text-xs text-muted">
              {sessionsRemaining} free session{sessionsRemaining !== 1 ? "s" : ""} remaining
            </span>
          )}
        </div>
      </header>

      {view.step === "email-capture" && (
        <EmailCapture onComplete={handleEmailComplete} />
      )}

      {view.step === "setup" && (
        <SetupForm
          onStart={(scenario) => setView({ step: "chat", scenario })}
        />
      )}

      {view.step === "chat" && (
        <NegotiationChat
          key={JSON.stringify(view.scenario)}
          scenario={view.scenario}
          onReset={handleStartNew}
          onEndSession={(messages) =>
            handleEndSession(view.scenario, messages)
          }
        />
      )}

      {view.step === "loading-feedback" && (
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-6">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
          <p className="text-sm text-muted">Analyzing your negotiation...</p>
        </main>
      )}

      {view.step === "feedback-error" && (
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-6">
          <div className="mx-auto max-w-sm text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <h2 className="mb-2 text-lg font-semibold">Feedback failed</h2>
            <p className="mb-6 text-sm text-muted">
              The analysis took too long or something went wrong. Your negotiation session is still valid — let&rsquo;s try getting feedback again.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setView({ step: "setup" })}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-border text-sm font-medium transition-colors hover:bg-card-hover"
              >
                New scenario
              </button>
            </div>
          </div>
        </main>
      )}

      {view.step === "feedback" && (
        <SessionFeedback
          feedback={view.feedback}
          onTryAgain={() => {
            if (getSessionCount() >= FREE_SESSION_LIMIT) {
              setView({ step: "upgrade" });
            } else {
              setView({ step: "chat", scenario: view.scenario });
            }
          }}
          onNewScenario={handleStartNew}
        />
      )}

      {view.step === "upgrade" && <UpgradeWall />}
    </div>
  );
}
