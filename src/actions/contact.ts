"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/schemas/contact";
import { sendContactEmail } from "@/services/email";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

const submissions = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string) {
  const now = Date.now();
  const bucket = submissions.get(key);

  if (!bucket || bucket.resetAt < now) {
    submissions.set(key, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }

  if (bucket.count >= 5) {
    return false;
  }

  bucket.count += 1;
  return true;
}

export async function submitContact(_state: ContactState, formData: FormData): Promise<ContactState> {
  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";

  if (!rateLimit(ip)) {
    return { status: "error", message: "Too many submissions. Try again later." };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject") || undefined,
    message: formData.get("message"),
    company: formData.get("company") || undefined
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  if (parsed.data.company) {
    return { status: "error", message: "Spam submission rejected." };
  }

  const delivery = await sendContactEmail(parsed.data);

  return {
    status: "success",
    message: delivery.delivered
      ? "Message sent. Auto-reply and admin notification are ready through Resend."
      : "Message validated. Configure Resend env vars to deliver production email."
  };
}
