import { z } from "zod";

export const projectCategorySchema = z.enum(["FRONTEND", "BACKEND", "AI", "FULLSTACK", "MOBILE"]);
export const projectStatusSchema = z.enum(["PLANNING", "ACTIVE", "SHIPPED", "ARCHIVED"]);

export const projectSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: z.string().trim().min(2).max(140).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().trim().min(20).max(3000),
  summary: z.string().trim().max(300).optional(),
  demoUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  coverImage: z.string().url().optional(),
  status: projectStatusSchema.default("ACTIVE"),
  category: projectCategorySchema.default("FULLSTACK"),
  featured: z.boolean().default(false),
  features: z.array(z.string().trim().min(2).max(140)).default([]),
  challenges: z.array(z.string().trim().min(2).max(200)).default([]),
  architecture: z.string().trim().max(3000).optional(),
  screenshots: z.array(z.string().url()).default([]),
  tags: z.array(z.string().trim().min(1).max(40)).default([])
});

export type ProjectInput = z.infer<typeof projectSchema>;
