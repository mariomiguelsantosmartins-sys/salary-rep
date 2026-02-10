import Link from "next/link";

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          SalaryRep
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="#pricing"
            className="hidden text-sm text-muted transition-colors hover:text-foreground sm:block"
          >
            Pricing
          </Link>
          <Link
            href="/practice"
            className="inline-flex h-10 items-center rounded-full bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Start practicing
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-20 pt-24 sm:pb-28 sm:pt-32">
      <div className="max-w-2xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
          Salary Negotiation Simulator
        </p>
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl sm:leading-tight">
          Practice the conversation
          <br />
          that pays you more
        </h1>
        <p className="mb-10 max-w-lg text-lg leading-relaxed text-muted">
          Enter your target role and industry. Our AI plays the recruiter who
          pushes back, says &ldquo;that&rsquo;s outside our budget,&rdquo; and
          waits through the silence. Run it ten times until the voice stops
          shaking.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/practice"
            className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-base font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Try it free
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-base font-medium transition-colors hover:bg-card-hover"
          >
            See how it works
          </a>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
        />
      </svg>
    ),
    title: "Realistic Scenarios",
    description:
      "Face budget constraints, internal equity arguments, and every common pushback recruiters and hiring managers actually use.",
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
        />
      </svg>
    ),
    title: "Session Feedback",
    description:
      "After each practice round, see exactly where you caved, where you apologized, and where you undersold yourself.",
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    ),
    title: "Multiple Personas",
    description:
      "Practice with different counterparts: the friendly recruiter, the tough hiring manager, the HR rep with a fixed budget.",
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
        />
      </svg>
    ),
    title: "AI-Powered",
    description:
      "Powered by advanced AI that adapts to your responses, pushes back naturally, and creates conversations that feel real.",
  },
];

function Features() {
  return (
    <section className="border-t border-border bg-card py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
          Features
        </p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight">
          Built for real negotiations
        </h2>
        <p className="mb-12 max-w-lg text-muted">
          Every feature is designed to prepare you for the moments that
          matter&nbsp;&mdash; when money is on the table and confidence is
          everything.
        </p>
        <div className="grid gap-8 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-background p-6 transition-colors hover:border-accent/30"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-accent">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    number: "01",
    title: "Set your scenario",
    description:
      "Choose the role you're negotiating for, the company size, and industry. We build a realistic scenario around it.",
  },
  {
    number: "02",
    title: "Negotiate with AI",
    description:
      "The AI plays the recruiter or hiring manager. It pushes back the way real people do. Practice holding firm and backing up your number.",
  },
  {
    number: "03",
    title: "Get your feedback",
    description:
      "After each session, see where you were strong and where you left money on the table. Then run it again.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
          How it works
        </p>
        <h2 className="mb-12 text-3xl font-bold tracking-tight">
          Three steps to confidence
        </h2>
        <div className="grid gap-10 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="mb-4 block font-mono text-3xl font-bold text-accent">
                {step.number}
              </span>
              <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const plans = [
  {
    name: "Free Trial",
    price: "$0",
    period: "",
    description: "Try basic salary negotiation simulations for entry-level roles",
    features: [
      "3 practice sessions",
      "Entry-level role scenarios",
      "Basic feedback after each session",
      "Text-based negotiation",
    ],
    cta: "Start free",
    href: "/practice",
    highlighted: false,
  },
  {
    name: "Basic",
    price: "$9.99",
    period: "/month",
    description: "Unlimited simulations across all experience levels",
    features: [
      "Unlimited practice sessions",
      "All experience levels",
      "Detailed session feedback",
      "Multiple negotiation personas",
      "Progress tracking",
    ],
    cta: "Get started",
    href: "/practice",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "$29.99",
    period: "/month",
    description: "Personalized coaching with advanced AI analysis",
    features: [
      "Everything in Basic",
      "Personalized coaching insights",
      "Advanced negotiation analytics",
      "Industry-specific scenarios",
      "Priority support",
    ],
    cta: "Go Pro",
    href: "/practice",
    highlighted: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="border-t border-border bg-card py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
          Pricing
        </p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight">
          Start free, upgrade when ready
        </h2>
        <p className="mb-12 max-w-lg text-muted">
          The free tier gives you real practice with real feedback. Upgrade when
          you want unlimited sessions and deeper insights.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl border p-6 ${
                plan.highlighted
                  ? "border-accent bg-accent-light"
                  : "border-border bg-background"
              }`}
            >
              <h3 className="mb-1 text-lg font-semibold">{plan.name}</h3>
              <div className="mb-1 flex items-baseline gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-sm text-muted">{plan.period}</span>
                )}
              </div>
              <p className="mb-6 text-sm text-muted">{plan.description}</p>
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
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
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`inline-flex h-11 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  plan.highlighted
                    ? "bg-accent text-white hover:bg-accent-hover"
                    : "border border-border hover:bg-card-hover"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="mb-6 text-sm font-medium uppercase tracking-widest text-accent">
          Why this matters
        </p>
        <blockquote className="mx-auto max-w-2xl text-2xl font-medium leading-relaxed tracking-tight sm:text-3xl">
          &ldquo;The person who practices ten times doesn&rsquo;t fold on the
          first pushback. That confidence pays for itself before the first
          paycheck clears.&rdquo;
        </blockquote>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} SalaryRep. All rights reserved.
        </p>
        <nav className="flex gap-6">
          <Link
            href="#pricing"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="/practice"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Practice
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <SocialProof />
      <Pricing />
      <Footer />
    </div>
  );
}
