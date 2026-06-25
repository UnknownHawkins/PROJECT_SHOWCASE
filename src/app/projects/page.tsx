import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectExplorer } from "@/components/project-explorer";
import { getProjectCatalog, getProjectStats } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { GsapReveal } from "@/components/motion/gsap-reveal";

export const metadata: Metadata = {
  title: "Projects Portfolio",
  description: "Browse the full catalog of engineering projects, full-stack apps, and open source libraries.",
};

export default function ProjectsPage() {
  const projects = getProjectCatalog();
  const stats = getProjectStats();

  return (
    <>
      <SiteHeader />
      <main className="page-enter mx-auto max-w-7xl px-5 py-24 md:px-8">
        <GsapReveal>
          <Badge>Portfolio Catalog</Badge>
          <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
            Engineering &amp;{" "}
            <span className="text-gradient">Open Source</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground/55 leading-8">
            An interactive archive of applications, scripts, and libraries built using TypeScript, React, Next.js, Node.js, and Python.
          </p>
        </GsapReveal>

        <div className="mt-12">
          <ProjectExplorer initialProjects={projects} stats={stats} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
