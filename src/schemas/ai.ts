import { z } from "zod";

export const aiToolSchema = z.object({
  tool: z.enum(["resume-analyzer", "project-recommendation", "skill-gap", "career-roadmap", "chat"]),
  prompt: z.string().trim().min(10).max(5000)
});

export type AiToolInput = z.infer<typeof aiToolSchema>;
