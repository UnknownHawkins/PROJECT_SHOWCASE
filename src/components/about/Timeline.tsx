import type { Experience } from "@/types";
import { MapPin, Calendar, ExternalLink } from "lucide-react";

type Props = {
  experiences: Experience[];
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function Timeline({ experiences }: Props) {
  const sorted = [...experiences].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <div className="timeline">
      {sorted.map((exp, i) => (
        <div key={exp.id} className="timeline-item">
          <div className="glass-card rounded-2xl p-6 ml-2">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="font-bold text-foreground text-lg">{exp.role}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-cyan-300 font-semibold text-sm">{exp.company}</span>
                  {exp.location && (
                    <>
                      <span className="text-foreground/20">·</span>
                      <span className="text-foreground/50 text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-foreground/40 flex-shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {formatDate(exp.startDate)} —{" "}
                  {exp.current ? (
                    <span className="badge-green text-[10px]">Present</span>
                  ) : (
                    exp.endDate ? formatDate(exp.endDate) : "—"
                  )}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-foreground/60 text-sm leading-6 mb-4">{exp.description}</p>

            {/* Highlights */}
            {exp.highlights.length > 0 && (
              <ul className="space-y-1.5 mb-4">
                {exp.highlights.map((h, j) => (
                  <li key={j} className="flex gap-2 text-sm text-foreground/65">
                    <span className="text-cyan-400 mt-0.5 flex-shrink-0">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Technologies */}
            {exp.technologies && exp.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="badge-cyan text-[10px]">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Connector line spacing */}
          {i < sorted.length - 1 && <div className="h-2" />}
        </div>
      ))}
    </div>
  );
}
