"use client";

import { useEffect, useRef } from "react";
import type { Skill } from "@/types";

type Props = {
  skills: Skill[];
};

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "var(--cyan)",
  Backend: "var(--blue)",
  Database: "var(--violet)",
  DevOps: "var(--green)",
  "AI/ML": "var(--pink)",
  Mobile: "var(--amber)",
  Tools: "var(--muted)",
  Languages: "var(--cyan)",
};

export function SkillsGrid({ skills }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Group by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category ?? "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  // Trigger animation when in viewport
  useEffect(() => {
    const bars = ref.current?.querySelectorAll(".skill-bar-fill");
    if (!bars) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animationPlayState = "running";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    bars.forEach((bar) => {
      (bar as HTMLElement).style.animationPlayState = "paused";
      observer.observe(bar);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid gap-8 md:grid-cols-2">
      {Object.entries(grouped).map(([category, catSkills]) => {
        const color = CATEGORY_COLORS[category] ?? "var(--cyan)";
        return (
          <div key={category} className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <span
                className="w-2 h-5 rounded-full"
                style={{ backgroundColor: color }}
              />
              <h3 className="font-bold text-foreground text-sm uppercase tracking-widest">
                {category}
              </h3>
            </div>

            <div className="space-y-4">
              {catSkills
                .sort((a, b) => b.level - a.level)
                .map((skill) => (
                  <div key={skill.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground/80">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        {skill.years && (
                          <span className="text-xs text-foreground/35">{skill.years}yr{skill.years !== 1 ? "s" : ""}</span>
                        )}
                        <span className="text-xs font-bold" style={{ color }}>
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-bar-fill"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${color}, ${color}88)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
