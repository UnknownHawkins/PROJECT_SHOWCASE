import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120).transform((value) => value.toLowerCase()),
  subject: z.string().trim().max(120).optional(),
  message: z.string().trim().min(20).max(2000),
  company: z.string().trim().max(80).optional()
});

export type ContactInput = z.infer<typeof contactSchema>;
