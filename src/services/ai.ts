import type { AiToolInput } from "@/schemas/ai";

const toolPrompts: Record<AiToolInput["tool"], string> = {
  "resume-analyzer": "Resume analysis",
  "project-recommendation": "Project recommendation",
  "skill-gap": "Skill gap analysis",
  "career-roadmap": "Career roadmap",
  chat: "AI assistant"
};

export async function runAiTool(input: AiToolInput) {
  const hasProvider = Boolean(process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY);

  if (!hasProvider) {
    return {
      provider: "local-fallback",
      title: toolPrompts[input.tool],
      output:
        "AI provider keys are not configured. Add OPENAI_API_KEY or GEMINI_API_KEY to enable live model responses. The platform route, validation, and response contract are ready."
    };
  }

  return {
    provider: process.env.OPENAI_API_KEY ? "openai" : "gemini",
    title: toolPrompts[input.tool],
    output:
      "Provider integration point reached. Connect the selected SDK call here after choosing your production model, token limits, and safety policy."
  };
}
