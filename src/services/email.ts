import { Resend } from "resend";
import type { ContactInput } from "@/schemas/contact";

export async function sendContactEmail(input: ContactInput) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: input.subject || "New Portfolio Contact Message",
              color: 0x5b8cff,
              fields: [
                { name: "Name", value: input.name, inline: true },
                { name: "Email", value: input.email, inline: true },
                { name: "Message", value: input.message }
              ],
              timestamp: new Date().toISOString()
            }
          ]
        })
      });
    } catch (e) {
      console.error("Failed to trigger webhook", e);
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return { delivered: !!webhookUrl, reason: webhookUrl ? "Webhook delivered (Resend skipped)." : "Resend is not configured." };
  }

  const resend = new Resend(apiKey);
  const response = await resend.emails.send({
    from,
    to,
    replyTo: input.email,
    subject: input.subject || `Portfolio message from ${input.name}`,
    text: `${input.name} <${input.email}>\n\n${input.message}`
  });

  return { delivered: !response.error, reason: response.error?.message ?? "Delivered." };
}
