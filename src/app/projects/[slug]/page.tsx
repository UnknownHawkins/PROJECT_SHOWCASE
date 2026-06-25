import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, Shield, Cpu, Zap, Star } from "lucide-react";
import { Github } from "@/components/icons";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GsapReveal } from "@/components/motion/gsap-reveal";
import { getProjectBySlug, getProjectCatalog } from "@/lib/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = getProjectCatalog();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="page-enter mx-auto max-w-5xl px-5 py-24 md:px-8">
        {/* Back Link */}
        <GsapReveal>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground/40 hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>
        </GsapReveal>

        {/* Hero Section */}
        <GsapReveal delay={0.05}>
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <Badge className="text-cyan-300 border-cyan-400/20 bg-transparent">
              {project.category.toUpperCase()}
            </Badge>
            <Badge className="text-amber-300 border-amber-400/20 bg-transparent">
              {project.status}
            </Badge>
            <Badge className="text-foreground/40 border-foreground/10 bg-transparent">
              {project.complexity}
            </Badge>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
                {project.title}
              </h1>
              <p className="text-lg text-foreground/50 mt-2 max-w-2xl">
                {project.role} · {project.developmentTime} build
              </p>
            </div>

            <div className="flex gap-3">
              <Button asChild variant="secondary" className="flex items-center gap-2">
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  GitHub
                </Link>
              </Button>
              {project.deploy && (
                <Button asChild className="flex items-center gap-2">
                  <Link href={project.deploy} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </GsapReveal>

        {/* Summary Card */}
        <div className="grid gap-6 mt-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <GsapReveal delay={0.1}>
              <div className="dark-panel grain rounded-3xl p-8 h-full">
                <h2 className="text-xl font-black text-foreground mb-4">Summary</h2>
                <p className="text-foreground/70 leading-8 mb-6">{project.summary}</p>
                <h3 className="font-bold text-foreground mb-2">Impact</h3>
                <p className="text-foreground/60 leading-7">{project.impact}</p>
              </div>
            </GsapReveal>
          </div>

          <GsapReveal delay={0.15}>
            <div className="glass-card rounded-3xl p-6 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-black text-foreground mb-4">Stack</h2>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-foreground/5 text-foreground/80 border border-foreground/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GsapReveal>
        </div>

        {/* Details Grid */}
        <div className="grid gap-6 mt-6 md:grid-cols-2">
          {/* Highlights */}
          <GsapReveal delay={0.2}>
            <div className="glass-card rounded-3xl p-6">
              <h2 className="text-lg font-black text-foreground flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-cyan-300" />
                Key Highlights
              </h2>
              <ul className="space-y-3 text-sm text-foreground/75">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GsapReveal>

          {/* Risks & Security */}
          <GsapReveal delay={0.25}>
            <div className="glass-card rounded-3xl p-6">
              <h2 className="text-lg font-black text-foreground flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-amber-300" />
                Risks &amp; Safety Solved
              </h2>
              <ul className="space-y-3 text-sm text-foreground/75">
                {project.risksSolved.map((risk, idx) => (
                  <li key={idx} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GsapReveal>
        </div>

        {/* Development Phases */}
        {project.phases && project.phases.length > 0 && (
          <div className="mt-12">
            <GsapReveal>
              <h2 className="text-2xl font-black text-foreground flex items-center gap-2 mb-6">
                <Cpu className="w-5 h-5 text-cyan-300" />
                Development Roadmap
              </h2>
            </GsapReveal>

            <div className="space-y-4">
              {project.phases.map((phase, idx) => (
                <GsapReveal key={idx} delay={idx * 0.05}>
                  <div className="dark-panel grain rounded-2xl p-6 border border-white/[0.04] hover:border-foreground/10 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div>
                        <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                          Phase {idx + 1}
                        </span>
                        <h3 className="font-bold text-foreground text-lg mt-0.5">{phase.title}</h3>
                      </div>
                      <span className="text-xs text-foreground/35 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {phase.duration}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/60 mb-4 leading-6">{phase.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {phase.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] font-medium bg-foreground/5 text-foreground/50 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </GsapReveal>
              ))}
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
