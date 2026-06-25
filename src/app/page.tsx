import Link from "next/link";
import { ArrowRight, Bot, ChartNoAxesCombined, ShieldCheck, Sparkles } from "lucide-react";
import { Github } from "@/components/icons";
import { AuroraBackground } from "@/components/aceternity/aurora-background";
import { SpotlightCard } from "@/components/aceternity/spotlight-card";
import { GsapReveal } from "@/components/motion/gsap-reveal";
import { ParticleField } from "@/components/three/particle-field";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/contact-form";
import { ProjectExplorer } from "@/components/project-explorer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProjectCatalog, getProjectStats } from "@/lib/projects";
import { getGitHubIntelligence } from "@/services/github";

const pillars = [
  {
    icon: Github,
    title: "GitHub Intelligence",
    body: "Repository analytics, languages, stars, forks, issues, PRs, contribution stats, and cached activity signals."
  },
  {
    icon: ChartNoAxesCombined,
    title: "Analytics Dashboard",
    body: "Visitor tracking, devices, countries, browsers, traffic sources, live visitors, and conversion-ready metrics."
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    body: "Clerk auth, RBAC, Zod validation, rate limits, CSP, secure headers, audit logs, and Prisma-backed persistence."
  },
  {
    icon: Bot,
    title: "AI Product Layer",
    body: "Resume analyzer, skill gap analysis, career roadmap generation, project recommendations, and assistant route."
  }
];

export default async function Home() {
  const [github] = await Promise.all([getGitHubIntelligence()]);
  const projects = getProjectCatalog();
  const stats = getProjectStats();

  return (
    <AuroraBackground>
      <SiteHeader />
      <main>
        <section className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-5 py-20 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <ParticleField />
          <GsapReveal>
            <Badge>Full-stack portfolio platform</Badge>
            <h1 className="mt-6 max-w-5xl text-6xl font-black leading-[0.86] tracking-[-0.075em] md:text-8xl">
              Developer portfolio rebuilt like a <span className="text-gradient">SaaS product</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/65">
              Premium public portfolio, admin dashboard, GitHub intelligence, analytics, MDX content, AI tools,
              secure APIs, PostgreSQL schema, Redis caching, and production deployment foundations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/projects">
                  View Platform <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/dashboard">Open Dashboard</Link>
              </Button>
            </div>
          </GsapReveal>

          <GsapReveal delay={0.15}>
            <div className="dark-panel grain rounded-[2.5rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">Live Intelligence</p>
                  <h2 className="mt-2 text-3xl font-black">GitHub Command Center</h2>
                </div>
                <Sparkles className="h-8 w-8 text-cyan-300" />
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  ["Repos", github.totalRepositories],
                  ["Stars", github.stars],
                  ["Forks", github.forks],
                  ["Followers", github.followers]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-3xl border border-foreground/10 bg-foreground/10 p-5">
                    <div className="text-3xl font-black text-cyan-200">{value}</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-foreground/45">{label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-3xl border border-foreground/10 bg-black/25 p-5">
                <p className="text-sm text-foreground/55">Top languages</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {github.topLanguages.slice(0, 6).map((language) => (
                    <span key={language.name} className="rounded-full bg-foreground/10 px-3 py-1 text-xs font-bold text-foreground/70">
                      {language.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GsapReveal>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <SpotlightCard key={pillar.title}>
                <pillar.icon className="h-7 w-7 text-cyan-300" />
                <h3 className="mt-6 text-xl font-black">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-foreground/60">{pillar.body}</p>
              </SpotlightCard>
            ))}
          </div>
        </section>

        <ProjectExplorer initialProjects={projects} stats={stats} />

        <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 md:px-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="dark-panel grain rounded-[2rem] p-6 md:p-8">
            <Badge>Production architecture</Badge>
            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
              Built for content, analytics, admin workflows, and integrations.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                "Prisma PostgreSQL data model for users, projects, blog, messages, analytics, logs, and settings",
                "Redis cache wrapper for GitHub rate-limit protection",
                "Clerk-ready auth middleware with Admin and Visitor RBAC",
                "MDX blog setup with SEO routes, sitemap, robots, and OpenGraph metadata",
                "PWA manifest and service worker foundation",
                "Docker, GitHub Actions, Vercel, Railway, Neon/Supabase, Upstash, Sentry-ready config"
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-foreground/10 bg-foreground/10 p-5 text-sm leading-6 text-foreground/60">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
      <SiteFooter />
    </AuroraBackground>
  );
}
