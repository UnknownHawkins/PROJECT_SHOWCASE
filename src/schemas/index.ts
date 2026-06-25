import { z } from "zod";

// ─── Contact ───────────────────────────────────────────────────────────────
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().max(120).optional(),
  message: z.string().min(20, "Message must be at least 20 characters").max(1200),
  // honeypot
  company: z.string().max(0, "Bot detected").optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

// ─── Project ───────────────────────────────────────────────────────────────
export const projectSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  title: z.string().min(1, "Title is required").max(120),
  description: z.string().min(1, "Description is required").max(1000),
  summary: z.string().max(300).optional(),
  demoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  coverImage: z.string().url().optional().or(z.literal("")),
  status: z.enum(["PLANNING", "ACTIVE", "SHIPPED", "ARCHIVED"]).default("ACTIVE"),
  category: z.enum(["FRONTEND", "BACKEND", "AI", "FULLSTACK", "MOBILE"]).default("FULLSTACK"),
  featured: z.boolean().default(false),
  features: z.array(z.string()).default([]),
  challenges: z.array(z.string()).default([]),
  architecture: z.string().max(5000).optional(),
  screenshots: z.array(z.string().url()).default([]),
  tags: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  startedAt: z.string().datetime().optional().or(z.literal("")),
  shippedAt: z.string().datetime().optional().or(z.literal("")),
});

export type ProjectInput = z.infer<typeof projectSchema>;

// ─── Blog Post ─────────────────────────────────────────────────────────────
export const blogPostSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  title: z.string().min(1).max(200),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1),
  coverImage: z.string().url().optional().or(z.literal("")),
  published: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  categoryId: z.string().optional(),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

// ─── Comment ───────────────────────────────────────────────────────────────
export const commentSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  body: z.string().min(5).max(2000),
});

export type CommentInput = z.infer<typeof commentSchema>;

// ─── Skill ─────────────────────────────────────────────────────────────────
export const skillSchema = z.object({
  name: z.string().min(1).max(80),
  level: z.number().int().min(0).max(100).default(70),
  category: z.string().min(1).max(60),
  years: z.number().min(0).max(50).optional(),
  technologyId: z.string().optional(),
});

export type SkillInput = z.infer<typeof skillSchema>;

// ─── Experience ────────────────────────────────────────────────────────────
export const experienceSchema = z.object({
  company: z.string().min(1).max(120),
  role: z.string().min(1).max(120),
  location: z.string().max(120).optional(),
  description: z.string().min(1).max(2000),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional().or(z.literal("")),
  current: z.boolean().default(false),
  highlights: z.array(z.string()).default([]),
});

export type ExperienceInput = z.infer<typeof experienceSchema>;

// ─── Education ─────────────────────────────────────────────────────────────
export const educationSchema = z.object({
  institution: z.string().min(1).max(200),
  degree: z.string().min(1).max(120),
  field: z.string().max(120).optional(),
  startYear: z.number().int().min(1900).max(2100),
  endYear: z.number().int().min(1900).max(2100).optional(),
  grade: z.string().max(40).optional(),
});

export type EducationInput = z.infer<typeof educationSchema>;

// ─── Certificate ───────────────────────────────────────────────────────────
export const certificateSchema = z.object({
  title: z.string().min(1).max(200),
  issuer: z.string().min(1).max(120),
  credential: z.string().max(200).optional(),
  url: z.string().url().optional().or(z.literal("")),
  issuedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional().or(z.literal("")),
});

export type CertificateInput = z.infer<typeof certificateSchema>;

// ─── AI Analysis ───────────────────────────────────────────────────────────
export const resumeAnalysisSchema = z.object({
  resumeText: z.string().min(50).max(10000),
  targetRole: z.string().min(1).max(120).optional(),
});

export type ResumeAnalysisInput = z.infer<typeof resumeAnalysisSchema>;

export const skillGapSchema = z.object({
  currentSkills: z.array(z.string()).min(1),
  targetRole: z.string().min(1).max(120),
  experienceLevel: z.enum(["junior", "mid", "senior", "lead"]).default("mid"),
});

export type SkillGapInput = z.infer<typeof skillGapSchema>;

export const chatMessageSchema = z.object({
  message: z.string().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      }),
    )
    .max(20)
    .default([]),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;

// ─── Analytics Track ───────────────────────────────────────────────────────
export const analyticsTrackSchema = z.object({
  path: z.string().max(500),
  referrer: z.string().max(500).optional(),
});

export type AnalyticsTrackInput = z.infer<typeof analyticsTrackSchema>;

// ─── Admin Settings ────────────────────────────────────────────────────────
export const adminSettingSchema = z.object({
  key: z.string().min(1).max(80),
  value: z.unknown(),
  description: z.string().max(300).optional(),
});

export type AdminSettingInput = z.infer<typeof adminSettingSchema>;
