import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/10 px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-foreground/50 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {siteConfig.name}. Built as a full-stack portfolio platform.</p>
        <p>Next.js 15 · PostgreSQL · Redis · Clerk · Prisma · Resend</p>
      </div>
    </footer>
  );
}
