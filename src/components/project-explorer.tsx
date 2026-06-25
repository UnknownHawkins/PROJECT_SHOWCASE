"use client";

import { startTransition, useDeferredValue, useMemo, useState } from "react";
import type { Project, ProjectCategory, ProjectStats } from "@/lib/projects";

type Props = {
  initialProjects: Project[];
  stats: ProjectStats;
};

const categories: Array<{ label: string; value: ProjectCategory | "all" }> = [
  { label: "All", value: "all" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Frontend", value: "frontend" },
  { label: "AI", value: "ai" }
];

export function ProjectExplorer({ initialProjects, stats }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const deferredQuery = useDeferredValue(query);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    return initialProjects.filter((project) => {
      const matchesCategory = category === "all" || project.category === category;
      const searchable = [project.title, project.summary, project.impact, project.role, ...project.technologies]
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [category, deferredQuery, initialProjects]);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="dark-panel grain sticky top-6 h-fit rounded-[2rem] p-6 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#d6ff4f]">Backend-fed catalog</p>
          <h2 className="mt-4 text-4xl font-black leading-none tracking-tight md:text-5xl">
            Search the stack, not just the screenshots.
          </h2>
          <p className="mt-5 text-sm leading-6 text-[#dbe4cf]">
            Project cards are rendered from typed server data and exposed through `/api/projects` and `/api/projects/[slug]`.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <Metric label="Projects" value={stats.projectCount} />
            <Metric label="Tech Used" value={stats.technologyCount} />
            <Metric label="Live Links" value={stats.liveDeployments} />
            <Metric label="Full Stack" value={stats.fullstackCount} />
          </div>

          <div className="mt-8 grid gap-3">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="rounded-2xl border border-foreground/10 bg-foreground/10 px-4 py-3 text-sm text-foreground outline-none placeholder:text-foreground/45 focus:border-[#d6ff4f] focus:ring-4 focus:ring-[#d6ff4f]/15"
              placeholder="Search React, MongoDB, AI, PHP..."
            />

            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => startTransition(() => setCategory(item.value))}
                  className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em] transition ${
                    category === item.value
                      ? "bg-[#d6ff4f] text-[#101511]"
                      : "bg-foreground/10 text-foreground/70 hover:bg-foreground/15 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          {filteredProjects.map((project, index) => (
            <article
              key={project.slug}
              className="panel grain reveal rounded-[2rem] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(16,21,17,0.18)] md:p-6"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#101511] px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-[#d6ff4f]">
                      {project.category}
                    </span>
                    <span className="rounded-full bg-[#c76f43]/15 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-[#7b3f25]">
                      {project.status}
                    </span>
                    <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-bold text-[#4c574b]">
                      {project.developmentTime}
                    </span>
                  </div>

                  <h3 className="mt-4 text-3xl font-black tracking-tight text-[#101511]">{project.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[#4c574b]">{project.summary}</p>
                  <p className="mt-3 max-w-2xl text-sm font-bold text-[#26332f]">{project.impact}</p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-black/10 bg-foreground/60 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] transition hover:bg-foreground/5"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.deploy}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#d6ff4f] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#101511] transition hover:bg-[#c6ef43]"
                  >
                    Live
                  </a>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span key={technology} className="rounded-full bg-black/[0.06] px-3 py-1 text-xs font-bold text-[#26332f]">
                    {technology}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <DetailList title="Highlights" items={project.highlights} />
                <DetailList title="Security / Risk Solved" items={project.risksSolved} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-foreground/10 bg-foreground/10 p-4">
      <div className="text-3xl font-black text-[#d6ff4f]">{value}</div>
      <div className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-foreground/60">{label}</div>
    </div>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl bg-foreground/50 p-4">
      <h4 className="text-sm font-black uppercase tracking-[0.18em] text-[#6f7d48]">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-[#4c574b]">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#c76f43]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
