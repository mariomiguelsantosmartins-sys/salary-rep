import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { z } from "zod";

export const maxDuration = 60;

const feedbackSchema = z.object({
  overallScore: z
    .number()
    .min(1)
    .max(10)
    .describe("Overall negotiation performance from 1 to 10"),
  finalOffer: z
    .string()
    .describe("The final salary number reached or last discussed"),
  targetSalary: z
    .string()
    .describe("The candidate's original target salary"),
  summary: z
    .string()
    .describe(
      "2-3 sentence plain-English summary of how the negotiation went overall"
    ),
  strengths: z
    .array(
      z.object({
        point: z.string().describe("What the candidate did well"),
        quote: z
          .string()
          .describe("A direct quote from the candidate demonstrating this"),
      })
    )
    .describe("2-4 things the candidate did well"),
  weaknesses: z
    .array(
      z.object({
        point: z.string().describe("Where the candidate could improve"),
        quote: z
          .string()
          .describe(
            "A direct quote from the candidate showing this weakness, or a description of the moment"
          ),
        suggestion: z
          .string()
          .describe("What they should have said or done instead"),
      })
    )
    .describe("2-4 areas where the candidate could improve"),
  tips: z
    .array(z.string())
    .describe("3-5 actionable tips for their next negotiation"),
});

export type Feedback = z.infer<typeof feedbackSchema>;

export async function POST(req: Request) {
  const { messages, scenario } = await req.json();

  const transcript = messages
    .map(
      (m: { role: string; content?: string; parts?: Array<{ type: string; text?: string }> }) => {
        const text =
          m.content ??
          m.parts
            ?.filter((p: { type: string }) => p.type === "text")
            .map((p: { text?: string }) => p.text)
            .join("") ??
          "";
        const label = m.role === "user" ? "CANDIDATE" : "COUNTERPART";
        return `${label}: ${text}`;
      }
    )
    .join("\n\n");

  const result = await generateObject({
    model: anthropic("claude-sonnet-4-20250514"),
    schema: feedbackSchema,
    prompt: `You are an expert salary negotiation coach analyzing a practice negotiation session.

SCENARIO:
- Role: ${scenario.role}
- Target Salary: $${scenario.targetSalary}
- Industry: ${scenario.industry}
- Company Size: ${scenario.companySize}
- Experience Level: ${scenario.experience}
- Negotiation Persona: ${scenario.persona}

CONVERSATION TRANSCRIPT:
${transcript}

Analyze this negotiation and provide detailed, actionable feedback. Be specific — reference exact moments in the conversation. Be encouraging but honest. The goal is to help this person negotiate better next time.

Key things to evaluate:
- Did they state their number confidently or hedge?
- Did they use data, competing offers, or unique value to justify their ask?
- Did they cave at the first pushback or hold firm?
- Did they apologize for asking or make excuses?
- Did they handle silence and pressure well?
- Did they negotiate beyond just base salary (equity, signing bonus, review timeline)?
- What was the gap between their target and the final number discussed?`,
  });

  return Response.json(result.object);
}
