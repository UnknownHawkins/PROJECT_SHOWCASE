import { contactSchema } from "@/schemas/contact";
import { sendContactEmail } from "@/services/email";

const submissions = new Map<string, { count: number; resetAt: number }>();

function json<T>(body: T, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    }
  });
}

function rateLimit(key: string) {
  const now = Date.now();
  const entry = submissions.get(key);

  if (!entry || entry.resetAt < now) {
    submissions.set(key, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }

  if (entry.count >= 5) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  const clientKey = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";

  if (!rateLimit(clientKey)) {
    return json({ error: "Too many submissions. Try again later." }, 429);
  }

  const payload = request.headers.get("content-type")?.includes("application/json")
    ? await request.json()
    : Object.fromEntries((await request.formData()).entries());
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return json({ error: parsed.error.issues[0]?.message ?? "Invalid request." }, 400);
  }

  if (parsed.data.company) {
    return json({ error: "Spam submission rejected." }, 400);
  }

  const delivery = await sendContactEmail(parsed.data);

  return json({
    ok: true,
    message: delivery.delivered
      ? "Message delivered."
      : "Message validated. Configure Resend to deliver email.",
    delivery
  });
}
