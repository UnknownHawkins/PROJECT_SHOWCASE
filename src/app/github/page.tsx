import type { Metadata } from "next";
import { Suspense } from "react";
import {
  GitFork,
  Star,
  Users,
  GitPullRequest,
  AlertCircle,
  Flame,
  Trophy,
  Code2,
  Calendar,
  Zap,
  Building2,
} from "lucide-react";
import { Github } from "@/components/icons";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { ContributionHeatmap } from "@/components/github/ContributionHeatmap";
import { LanguageBar } from "@/components/github/LanguageBar";
import { RepoCard } from "@/components/github/RepoCard";
import { CommitChart } from "@/components/github/CommitChart";
import { GsapReveal } from "@/components/motion/gsap-reveal";
import { getGitHubIntelligence } from "@/services/github";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "GitHub Intelligence",
  description: `Explore ${siteConfig.name}'s GitHub activity, repositories, contribution heatmap, and language statistics.`,
};

export const revalidate = 1800; // 30 min ISR

function StatBubble({
  icon: Icon,
  label,
  value,
  color = "var(--cyan)",
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="stat-card flex flex-col items-center text-center gap-2 p-5">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${color}20`, border: `1px solid ${color}30` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="text-2xl font-black" style={{ color }}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      <div className="text-xs text-foreground/40 font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
}

async function GitHubContent() {
  const github = await getGitHubIntelligence();
  const publicRepos = github.repositories.filter((r) => !r.isPrivate && !r.isFork);
  const topRepos = [...publicRepos]
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 12);

  return (
    <div className="space-y-16">
      {/* Stats Grid */}
      <GsapReveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <StatBubble icon={Github} label="Repositories" value={github.totalRepositories} />
          <StatBubble icon={Star} label="Total Stars" value={github.stars} color="var(--amber)" />
          <StatBubble icon={GitFork} label="Forks" value={github.forks} color="var(--blue)" />
          <StatBubble icon={Users} label="Followers" value={github.followers} color="var(--violet)" />
          <StatBubble icon={GitPullRequest} label="Pull Requests" value={github.pullRequests} color="var(--green)" />
          <StatBubble icon={AlertCircle} label="Issues" value={github.issues} color="var(--pink)" />
        </div>
      </GsapReveal>

      {/* Streak Row */}
      <GsapReveal>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="dark-panel grain rounded-3xl p-6 text-center">
            <Flame className="w-8 h-8 text-orange-400 mx-auto mb-3" />
            <div className="text-4xl font-black text-orange-400">{github.currentStreak}</div>
            <div className="text-sm text-foreground/45 mt-1">Current Streak (days)</div>
          </div>
          <div className="dark-panel grain rounded-3xl p-6 text-center">
            <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <div className="text-4xl font-black text-amber-400">{github.longestStreak}</div>
            <div className="text-sm text-foreground/45 mt-1">Longest Streak (days)</div>
          </div>
          <div className="dark-panel grain rounded-3xl p-6 text-center">
            <Zap className="w-8 h-8 text-cyan-300 mx-auto mb-3" />
            <div className="text-4xl font-black text-cyan-300">
              {github.contributions.toLocaleString()}
            </div>
            <div className="text-sm text-foreground/45 mt-1">Total Contributions</div>
          </div>
        </div>
      </GsapReveal>

      {/* Contribution Heatmap */}
      {github.contributionCalendar && (
        <GsapReveal>
          <div className="dark-panel grain rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-black flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-300" />
                  Contribution Activity
                </h2>
                <p className="text-sm text-foreground/45 mt-1">
                  {github.contributionCalendar.totalContributions.toLocaleString()} contributions in the last year
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <ContributionHeatmap calendar={github.contributionCalendar} />
            </div>
          </div>
        </GsapReveal>
      )}

      {/* Languages + Yearly Commits */}
      <div className="grid gap-6 md:grid-cols-2">
        <GsapReveal>
          <div className="dark-panel grain rounded-3xl p-6">
            <h2 className="text-xl font-black flex items-center gap-2 mb-6">
              <Code2 className="w-5 h-5 text-cyan-300" />
              Languages
            </h2>
            <LanguageBar languages={github.topLanguages} />
          </div>
        </GsapReveal>

        {github.yearlyStats && github.yearlyStats.length > 0 && (
          <GsapReveal delay={0.1}>
            <div className="dark-panel grain rounded-3xl p-6">
              <h2 className="text-xl font-black flex items-center gap-2 mb-6">
                <Zap className="w-5 h-5 text-cyan-300" />
                Commits Per Year
              </h2>
              <CommitChart yearlyStats={github.yearlyStats} />
            </div>
          </GsapReveal>
        )}
      </div>

      {/* Organizations */}
      {github.organizations && github.organizations.length > 0 && (
        <GsapReveal>
          <div className="dark-panel grain rounded-3xl p-6">
            <h2 className="text-xl font-black flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-cyan-300" />
              Organizations
            </h2>
            <div className="flex flex-wrap gap-2">
              {github.organizations.map((org) => (
                <span key={org} className="badge-cyan">{org}</span>
              ))}
            </div>
          </div>
        </GsapReveal>
      )}

      {/* Top Repositories */}
      <GsapReveal>
        <div>
          <h2 className="text-2xl font-black flex items-center gap-2 mb-6">
            <Star className="w-6 h-6 text-amber-300" />
            Top Repositories
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topRepos.map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))}
          </div>
        </div>
      </GsapReveal>

      {/* Cache notice */}
      <p className="text-center text-xs text-foreground/25">
        Data cached at {new Date(github.cachedAt).toLocaleString()} · Updates every 30 minutes
      </p>
    </div>
  );
}

export default function GitHubPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-enter mx-auto max-w-7xl px-5 py-24 md:px-8">
        <GsapReveal>
          <Badge>GitHub Intelligence</Badge>
          <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
            Code &amp;{" "}
            <span className="text-gradient">Contributions</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground/55 leading-8">
            Live statistics, repository analytics, contribution heatmap, and language
            breakdown — all fetched directly from GitHub.
          </p>
        </GsapReveal>

        <div className="mt-16">
          <Suspense
            fallback={
              <div className="space-y-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="skeleton h-48 rounded-3xl" />
                ))}
              </div>
            }
          >
            <GitHubContent />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
