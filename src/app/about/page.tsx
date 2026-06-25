import type { Metadata } from "next";
import { MapPin, Briefcase, GraduationCap, Award, Star, Download, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TechStackDisplay } from "@/components/about/TechStackDisplay";
import { Timeline } from "@/components/about/Timeline";
import { GsapReveal } from "@/components/motion/gsap-reveal";
import { siteConfig } from "@/config/site";
import type { Skill, Experience, Education, Certificate, Achievement } from "@/types";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${siteConfig.name} — a full-stack developer passionate about building world-class web experiences.`,
};

// ─── Static Data (replace with DB when available) ─────────────────────────
const skills: Skill[] = [
  { id: "1", name: "TypeScript", level: 92, category: "Languages", years: 3 },
  { id: "2", name: "JavaScript", level: 95, category: "Languages", years: 4 },
  { id: "3", name: "Python", level: 78, category: "Languages", years: 3 },
  { id: "4", name: "React", level: 90, category: "Frontend", years: 3 },
  { id: "5", name: "Next.js", level: 88, category: "Frontend", years: 2 },
  { id: "6", name: "TailwindCSS", level: 93, category: "Frontend", years: 3 },
  { id: "7", name: "Framer Motion", level: 80, category: "Frontend", years: 2 },
  { id: "8", name: "Node.js", level: 85, category: "Backend", years: 3 },
  { id: "9", name: "Express.js", level: 82, category: "Backend", years: 2 },
  { id: "10", name: "PostgreSQL", level: 80, category: "Database", years: 2 },
  { id: "11", name: "Redis", level: 72, category: "Database", years: 1 },
  { id: "12", name: "Prisma", level: 85, category: "Database", years: 2 },
  { id: "13", name: "Docker", level: 75, category: "DevOps", years: 2 },
  { id: "14", name: "GitHub Actions", level: 78, category: "DevOps", years: 2 },
  { id: "15", name: "Vercel", level: 88, category: "DevOps", years: 2 },
  { id: "16", name: "Three.js", level: 65, category: "Frontend", years: 1 },
  { id: "17", name: "Gemini API", level: 72, category: "AI/ML", years: 1 },
  { id: "18", name: "OpenAI API", level: 70, category: "AI/ML", years: 1 },
];

const experiences: Experience[] = [
  {
    id: "1",
    company: "Open Source Projects",
    role: "Full-Stack Developer",
    location: "Remote",
    description:
      "Building and contributing to open-source projects with a focus on developer tooling, web performance, and modern architecture patterns.",
    startDate: "2022-01-01T00:00:00Z",
    current: true,
    highlights: [
      "Architected and shipped production-ready Next.js applications with 95+ Lighthouse scores",
      "Implemented GitHub GraphQL integrations with Redis caching for real-time analytics",
      "Built enterprise-grade auth systems with Clerk, RBAC, and audit logging",
      "Designed complex Prisma schemas supporting 20+ models with proper indexing",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Prisma", "Clerk"],
  },
  {
    id: "2",
    company: "Freelance",
    role: "Frontend Developer",
    location: "Remote",
    description:
      "Delivered high-quality frontend solutions for diverse clients, specializing in React ecosystems and performance-optimized UI implementations.",
    startDate: "2021-06-01T00:00:00Z",
    endDate: "2022-01-01T00:00:00Z",
    current: false,
    highlights: [
      "Built 10+ client projects using React, Next.js, and TailwindCSS",
      "Achieved sub-1-second First Contentful Paint on all major projects",
      "Implemented responsive, accessible UI components following WCAG 2.1 guidelines",
    ],
    technologies: ["React", "Next.js", "TailwindCSS", "JavaScript", "Figma"],
  },
];

const education: Education[] = [
  {
    id: "1",
    institution: "Computer Science & Engineering Graduate",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Software Development & Systems",
    startYear: 2021,
    endYear: 2025,
    grade: "CGPA: 8.5/10",
    highlights: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Database Management Systems",
      "Computer Networks",
      "Software Engineering",
    ],
  },
];

const certificates: Certificate[] = [
  {
    id: "1",
    title: "Meta Frontend Developer Professional",
    issuer: "Meta / Coursera",
    issuedAt: "2023-06-01T00:00:00Z",
    url: "https://www.coursera.org",
  },
  {
    id: "2",
    title: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    issuedAt: "2024-01-01T00:00:00Z",
    url: "https://cloud.google.com/certification",
  },
  {
    id: "3",
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    issuedAt: "2023-09-01T00:00:00Z",
    url: "https://aws.amazon.com/certification",
  },
];

export default function AboutPage() {
  const currentYear = new Date().getFullYear();
  const yearsExp = currentYear - 2021;

  return (
    <>
      <SiteHeader />
      <main className="page-enter">
        {/* Hero */}
        <section className="relative mx-auto max-w-7xl px-5 py-24 md:px-8">
          <GsapReveal>
            <Badge>About Me</Badge>
            <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
              Building the web,{" "}
              <span className="text-gradient">one line at a time.</span>
            </h1>
          </GsapReveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.45fr]">
            <GsapReveal delay={0.1}>
              <div className="glass-card rounded-3xl p-8">
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-blue-600/30 border border-cyan-400/30 flex items-center justify-center text-3xl font-black text-cyan-300">
                    {siteConfig.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">{siteConfig.name}</h2>
                    <p className="text-cyan-300 font-semibold mt-0.5">Full-Stack Developer</p>
                    <div className="flex items-center gap-1.5 text-foreground/50 text-sm mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>India</span>
                    </div>
                  </div>
                </div>

                <p className="text-foreground/70 leading-8 mb-6">
                  I'm a full-stack developer with {yearsExp}+ years of experience crafting
                  production-grade web applications. I specialize in Next.js, TypeScript, and
                  modern backend systems — turning complex ideas into fast, secure, and
                  beautiful digital experiences.
                </p>
                <p className="text-foreground/60 leading-8">
                  When I'm not writing code, I contribute to open-source, explore new frameworks,
                  and write about software architecture and engineering practices on my blog.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="sm">
                    <Link href={siteConfig.links.github} target="_blank">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="secondary">
                    <Link href={siteConfig.links.linkedin} target="_blank">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="secondary">
                    <Link href={siteConfig.links.email}>
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Link>
                  </Button>
                </div>
              </div>
            </GsapReveal>

            {/* Quick Stats */}
            <GsapReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-3 h-fit">
                {[
                  { label: "Years Experience", value: `${yearsExp}+`, color: "var(--cyan)" },
                  { label: "Projects Built", value: "20+", color: "var(--blue)" },
                  { label: "Technologies", value: "30+", color: "var(--violet)" },
                  { label: "Open Source", value: "Active", color: "var(--green)" },
                ].map((stat) => (
                  <div key={stat.label} className="stat-card text-center">
                    <div
                      className="text-3xl font-black mb-1"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-foreground/45 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </GsapReveal>
          </div>
        </section>

        {/* Skills */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <GsapReveal>
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-5 h-5 text-blue-600" />
              <h2 className="text-3xl font-black">Tech Stack</h2>
            </div>
            <p className="text-foreground/55 mb-10 ml-8">
              Live data — fetched from GitHub in real time
            </p>
          </GsapReveal>
          <TechStackDisplay />
        </section>

        {/* Experience */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <GsapReveal>
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="w-5 h-5 text-cyan-300" />
              <h2 className="text-3xl font-black">Experience</h2>
            </div>
            <p className="text-foreground/55 mb-10 ml-8">Where I've built and shipped</p>
          </GsapReveal>
          <Timeline experiences={experiences} />
        </section>

        {/* Education */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <GsapReveal>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-5 h-5 text-cyan-300" />
              <h2 className="text-3xl font-black">Education</h2>
            </div>
          </GsapReveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {education.map((edu) => (
              <div key={edu.id} className="glass-card rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-violet-400/20 flex items-center justify-center mb-4">
                  <GraduationCap className="w-5 h-5 text-violet-300" />
                </div>
                <h3 className="font-bold text-foreground mb-0.5">{edu.degree}</h3>
                {edu.field && <p className="text-sm text-cyan-300 mb-1">{edu.field}</p>}
                <p className="text-sm text-foreground/55 mb-2">{edu.institution}</p>
                <p className="text-xs text-foreground/35 mb-3">
                  {edu.startYear} — {edu.endYear ?? "Present"}
                  {edu.grade && ` · ${edu.grade}`}
                </p>
                {edu.highlights && (
                  <div className="flex flex-wrap gap-1">
                    {edu.highlights.slice(0, 4).map((h) => (
                      <span key={h} className="badge-cyan text-[9px]">{h}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Certificates */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <GsapReveal>
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-5 h-5 text-cyan-300" />
              <h2 className="text-3xl font-black">Certificates</h2>
            </div>
          </GsapReveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <Link
                key={cert.id}
                href={cert.url ?? "#"}
                target={cert.url ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-5 hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-amber-300" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm leading-tight">{cert.title}</p>
                    <p className="text-xs text-foreground/50 mt-1">{cert.issuer}</p>
                    <p className="text-xs text-foreground/35 mt-1">
                      {new Date(cert.issuedAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
