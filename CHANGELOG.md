# Changelog

## [0.3.0] - 2026-02-09

### Added
- Session feedback feature: AI analyzes completed negotiations and provides structured coaching
- Feedback API route `/api/feedback` using structured output (Zod schema) for consistent results
- Score ring visualization showing overall performance (1-10)
- Strengths section with direct quotes from the conversation
- Weaknesses section with quotes and concrete "try instead" suggestions
- Actionable tips list for the next negotiation
- Loading state with spinner during feedback analysis
- "Try same scenario again" and "New scenario" buttons after feedback
- "End session & get feedback" button appears after 3+ messages in chat

## [0.2.0] - 2026-02-09

### Added
- AI-powered salary negotiation chat using Anthropic Claude (via Vercel AI SDK v6)
- API route `/api/chat` with streaming responses
- Three negotiation personas: Friendly Recruiter, Tough Hiring Manager, HR Budget Holder
- Real-time chat interface with message streaming and typing indicators
- Scenario context passed to AI (role, salary, industry, company size, experience)

## [0.1.0] - 2026-02-09

### Added
- Project initialization with Next.js 16, Tailwind CSS 4, TypeScript
- Landing page with hero, features, how-it-works, social proof, pricing, and footer sections
- Practice scenario setup form with role, salary, industry, company size, experience level, and persona selection
- Design system with semantic color tokens supporting light and dark modes
- Geist font integration
- Responsive layouts for mobile, tablet, and desktop
- Reduced motion support
