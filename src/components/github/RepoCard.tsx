import Link from "next/link";
import { Star, GitFork, AlertCircle, ExternalLink, Globe } from "lucide-react";
import type { GitHubRepository } from "@/types";

type Props = {
  repo: GitHubRepository;
  className?: string;
};

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  Rust: "#dea584",
  Go: "#00add8",
  CSS: "#663399",
  HTML: "#e34c26",
  Shell: "#89e051",
  Kotlin: "#a97bff",
  Swift: "#f05138",
};

function fmtNum(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export function RepoCard({ repo, className = "" }: Props) {
  const langColor =
    repo.primaryLanguage
      ? (LANG_COLORS[repo.primaryLanguage] ?? `hsl(${repo.primaryLanguage.charCodeAt(0) * 13}, 60%, 55%)`)
      : null;

  return (
    <div
      className={`glass-card rounded-2xl p-5 flex flex-col gap-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground hover:text-cyan-300 transition-colors truncate block"
          >
            {repo.name}
          </Link>
          <p className="text-xs text-foreground/50 mt-0.5 line-clamp-2 leading-5">
            {repo.description}
          </p>
        </div>
        <div className="flex gap-1.5 flex-shrink-0">
          {repo.homepageUrl && (
            <Link
              href={repo.homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/40 hover:text-cyan-300 transition-colors"
            >
              <Globe className="w-4 h-4" />
            </Link>
          )}
          <Link
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/40 hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((t) => (
            <span key={t} className="badge-cyan text-[10px] px-2 py-0.5">
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-4 mt-auto pt-2 border-t border-white/[0.06] text-xs text-foreground/50">
        {repo.primaryLanguage && (
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: langColor ?? "#888" }}
            />
            <span>{repo.primaryLanguage}</span>
          </div>
        )}

        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5" />
          <span>{fmtNum(repo.stars)}</span>
        </div>

        <div className="flex items-center gap-1">
          <GitFork className="w-3.5 h-3.5" />
          <span>{fmtNum(repo.forks)}</span>
        </div>

        {repo.issues > 0 && (
          <div className="flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{repo.issues}</span>
          </div>
        )}

        <span className="ml-auto">{timeAgo(repo.updatedAt)}</span>
      </div>
    </div>
  );
}
