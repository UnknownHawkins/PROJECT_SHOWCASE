import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  DATABASE_URL: z.string().optional(),
  DIRECT_URL: z.string().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().email().optional(),
  CONTACT_TO_EMAIL: z.string().email().optional(),
  CONTACT_WEBHOOK_URL: z.string().url().optional(),
  CONTACT_ALLOWED_ORIGIN: z.string().url().optional(),
  GITHUB_USERNAME: z.string().optional(),
  GITHUB_TOKEN: z.string().optional(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
  CLERK_SECRET_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  NEXT_PUBLIC_GA_ID: z.string().optional()
});

export const env = envSchema.parse(process.env);

export function getSiteUrl() {
  return env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
