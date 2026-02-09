"use client";

import Link from "next/link";
import { useState } from "react";

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

export default function PracticePage() {
  const [role, setRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [experience, setExperience] = useState("");
  const [persona, setPersona] = useState("friendly-recruiter");
  const [targetSalary, setTargetSalary] = useState("");

  const isFormValid =
    role.trim() && industry && companySize && experience && targetSalary.trim();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            SalaryRep
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          Set up your scenario
        </h1>
        <p className="mb-10 text-muted">
          Tell us about the role you&rsquo;re negotiating for. We&rsquo;ll build
          a realistic conversation around it.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!isFormValid) return;
            // TODO: Start negotiation session
          }}
          className="space-y-8"
        >
          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-medium"
            >
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

          {/* Target Salary */}
          <div>
            <label
              htmlFor="salary"
              className="mb-2 block text-sm font-medium"
            >
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

          {/* Industry */}
          <div>
            <label
              htmlFor="industry"
              className="mb-2 block text-sm font-medium"
            >
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

          {/* Company Size */}
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

          {/* Experience Level */}
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

          {/* Persona Selection */}
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
                    <span className="block text-sm font-medium">
                      {p.label}
                    </span>
                    <span className="block text-sm text-muted">
                      {p.description}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent text-base font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            Start negotiation
          </button>
        </form>
      </main>
    </div>
  );
}
