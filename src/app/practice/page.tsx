"use client";

import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useState, useRef, useEffect, useMemo } from "react";

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

function getTextFromMessage(message: { parts: Array<{ type: string; text?: string }> }): string {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("");
}

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

function NegotiationChat({
  scenario,
  onReset,
}: {
  scenario: Scenario;
  onReset: () => void;
}) {
  const [input, setInput] = useState("");
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: { scenario } }),
    [scenario]
  );
  const { messages, sendMessage, status, error } = useChat({
    transport,
    messages: [
      {
        id: "system-start",
        role: "user",
        parts: [
          {
            type: "text" as const,
            text: `Hi, I'm excited about the ${scenario.role} opportunity. I'd love to discuss the compensation package.`,
          },
        ],
      },
    ] as UIMessage[],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isActive = status === "streaming" || status === "submitted";

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
          <button
            onClick={onReset}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-card-hover"
          >
            New scenario
          </button>
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

export default function PracticePage() {
  const [scenario, setScenario] = useState<Scenario | null>(null);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            SalaryRep
          </Link>
        </div>
      </header>

      {scenario ? (
        <NegotiationChat
          key={JSON.stringify(scenario)}
          scenario={scenario}
          onReset={() => setScenario(null)}
        />
      ) : (
        <SetupForm onStart={setScenario} />
      )}
    </div>
  );
}
