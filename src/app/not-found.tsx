import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <section className="panel max-w-xl rounded-[2rem] p-8 text-center">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300">404</p>
        <h1 className="mt-4 text-4xl font-black">This route is outside the map.</h1>
        <p className="mt-4 text-foreground/60">Return to the platform home or dashboard.</p>
        <Button asChild className="mt-6">
          <Link href="/">Go Home</Link>
        </Button>
      </section>
    </main>
  );
}
