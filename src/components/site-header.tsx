import Link from "next/link";
import { publicNav } from "@/constants/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-slate-950/45 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="text-sm font-black uppercase tracking-[0.22em] text-foreground">
          Anubhav<span className="text-cyan-300">.dev</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {publicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-foreground/60 transition hover:bg-foreground/10 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button size="sm" variant="ghost" className="text-xs font-bold uppercase tracking-[0.16em]">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm" variant="secondary" className="text-xs font-bold uppercase tracking-[0.16em]">
                Sign Up
              </Button>
            </SignUpButton>
            <Button asChild size="sm" variant="ghost">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </Show>
          <Show when="signed-in">
            <UserButton />
            <Button asChild size="sm" variant="secondary">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </Show>
        </div>
      </div>
    </header>
  );
}
