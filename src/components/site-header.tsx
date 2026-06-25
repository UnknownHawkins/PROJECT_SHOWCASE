import Link from "next/link";
import { publicNav } from "@/constants/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

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
          <Button asChild size="sm" variant="secondary">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
