import type { GitHubYearlyStats } from "@/types";

type Props = {
  yearlyStats: GitHubYearlyStats[];
  className?: string;
};

export function CommitChart({ yearlyStats, className = "" }: Props) {
  if (!yearlyStats || yearlyStats.length === 0) {
    return (
      <div className={`flex items-center justify-center h-32 text-foreground/30 text-sm ${className}`}>
        No commit data available
      </div>
    );
  }

  const sorted = [...yearlyStats].sort((a, b) => a.year - b.year);
  const max = Math.max(...sorted.map((s) => s.totalContributions), 1);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-end gap-3 h-32">
        {sorted.map((stat) => {
          const height = Math.max((stat.totalContributions / max) * 100, 4);
          return (
            <div key={stat.year} className="flex flex-col items-center gap-2 flex-1 min-w-0">
              <span className="text-xs font-bold text-cyan-300">
                {stat.totalContributions.toLocaleString()}
              </span>
              <div className="w-full relative" style={{ height: "5rem" }}>
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-t-md transition-all duration-700"
                  style={{
                    height: `${height}%`,
                    background: `linear-gradient(to top, rgba(125,249,255,0.8), rgba(91,140,255,0.6))`,
                    boxShadow: "0 0 12px rgba(125,249,255,0.25)",
                  }}
                />
              </div>
              <span className="text-xs text-foreground/40">{stat.year}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
