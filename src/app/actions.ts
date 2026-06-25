"use server";

import {
  assertSameOrigin,
  forwardContactMessage,
  getClientKey,
  rateLimit,
  validateContactPayload
} from "@/lib/security";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitContact(_state: ContactState, formData: FormData): Promise<ContactState> {
  const clientKey = await getClientKey();
  const limit = rateLimit(`action-contact:${clientKey}`, 5, 60 * 60 * 1000);

  if (!limit.allowed) {
    return { status: "error", message: "Too many submissions. Try again later." };
  }

  if (!(await assertSameOrigin())) {
    return { status: "error", message: "Invalid request origin." };
  }

  const parsed = validateContactPayload(formData);

  if (!parsed.ok) {
    return { status: "error", message: parsed.error };
  }

  const delivery = await forwardContactMessage(parsed.data);

  return {
    status: "success",
    message: delivery.delivered
      ? "Message sent securely."
      : "Message validated locally. Configure CONTACT_WEBHOOK_URL to deliver submissions."
  };
}
