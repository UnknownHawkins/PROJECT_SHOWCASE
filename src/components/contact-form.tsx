"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialState: ContactState = {
  status: "idle",
  message: "Submissions are validated, rate limited, and optionally forwarded through CONTACT_WEBHOOK_URL."
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);

  return (
    <form action={formAction} className="panel grain rounded-[2rem] p-6 md:p-8">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">Secure Backend Form</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">Start a build conversation</h2>
        <p className="mt-3 text-sm leading-6 text-foreground/60">
          Server action, Zod validation, honeypot protection, rate limiting, and Resend delivery are wired for production.
        </p>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-bold">
          Name
          <Input
            required
            name="name"
            minLength={2}
            placeholder="Anubhav Singh"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold">
          Email
          <Input
            required
            name="email"
            type="email"
            placeholder="you@example.com"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold">
          Subject
          <Input name="subject" placeholder="Full-stack portfolio build" />
        </label>

        <label className="hidden">
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>

        <label className="grid gap-2 text-sm font-bold">
          Message
          <Textarea
            required
            name="message"
            minLength={20}
            rows={5}
            placeholder="Tell me what backend, dashboard, auth, or project showcase features you want next."
          />
        </label>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="mt-6 w-full"
      >
        {isPending ? "Sending..." : "Send Secure Message"}
      </Button>

      <p
        className={`mt-4 rounded-2xl px-4 py-3 text-sm ${
          state.status === "error"
            ? "bg-red-500/10 text-red-200"
            : state.status === "success"
              ? "bg-cyan-300/10 text-cyan-100"
              : "bg-foreground/5 text-foreground/55"
        }`}
      >
        {state.message}
      </p>
    </form>
  );
}
