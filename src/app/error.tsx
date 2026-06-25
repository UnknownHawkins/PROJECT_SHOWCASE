"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <section className="panel max-w-xl rounded-[2rem] p-8 text-center">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-pink-300">Runtime Error</p>
        <h1 className="mt-4 text-4xl font-black">A recoverable error occurred.</h1>
        <p className="mt-4 text-foreground/60">Try again. If this persists, check Sentry logs after configuring `SENTRY_DSN`.</p>
        <Button className="mt-6" onClick={reset}>Retry</Button>
      </section>
    </main>
  );
}
