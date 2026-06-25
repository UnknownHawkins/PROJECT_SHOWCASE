import { headers } from "next/headers";

type RateEntry = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateEntry>();

export function createJsonResponse<T>(body: T, init?: ResponseInit) {
  return Response.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...(init?.headers ?? {})
    }
  });
}

export function cleanText(value: FormDataEntryValue | null, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateContactPayload(formData: FormData) {
  const name = cleanText(formData.get("name"), 80);
  const email = cleanText(formData.get("email"), 120).toLowerCase();
  const message = cleanText(formData.get("message"), 1200);
  const company = cleanText(formData.get("company"), 80);

  if (company) {
    return { ok: false as const, error: "Spam submission rejected." };
  }

  if (name.length < 2) {
    return { ok: false as const, error: "Name must be at least 2 characters." };
  }

  if (!isEmail(email)) {
    return { ok: false as const, error: "Enter a valid email address." };
  }

  if (message.length < 20) {
    return { ok: false as const, error: "Message must be at least 20 characters." };
  }

  return { ok: true as const, data: { name, email, message } };
}

export async function assertSameOrigin() {
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin");
  const allowedOrigin = process.env.CONTACT_ALLOWED_ORIGIN ?? process.env.NEXT_PUBLIC_SITE_URL;

  if (!origin || !allowedOrigin) {
    return true;
  }

  return origin === allowedOrigin;
}

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count };
}

export async function getClientKey() {
  const requestHeaders = await headers();

  return (
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "local"
  );
}

export async function forwardContactMessage(message: { name: string; email: string; message: string }) {
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    return { delivered: false, reason: "CONTACT_WEBHOOK_URL is not configured." };
  }

  const response = await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...message,
      source: "project-showcase",
      submittedAt: new Date().toISOString()
    })
  });

  return { delivered: response.ok, reason: response.ok ? "Delivered." : "Webhook rejected the request." };
}
