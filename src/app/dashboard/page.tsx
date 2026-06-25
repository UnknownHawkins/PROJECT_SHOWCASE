import type { Metadata } from "next";
import {
  FolderKanban,
  FileText,
  MessageSquare,
  Users,
  BarChart3,
  Activity,
  TrendingUp,
  Star,
  ArrowUpRight,
  Eye,
  Zap,
} from "lucide-react";
import { Github } from "@/components/icons";
import Link from "next/link";
import { getGitHubIntelligence } from "@/services/github";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Dashboard Overview" };

function MetricCard({
  icon: Icon,
  label,
  value,
  delta,
  deltaType = "up",
  href,
  color = "#7df9ff",
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: "up" | "down" | "neutral";
  href?: string;
  color?: string;
}) {
  const card = (
    <div className="stat-card group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}18`, border: `1px solid ${color}28` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        {href && (
          <ArrowUpRight className="w-4 h-4 text-foreground/20 group-hover:text-foreground/50 transition-colors" />
        )}
      </div>
      <div className="text-3xl font-black text-foreground mb-1">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      <div className="text-sm text-foreground/45">{label}</div>
      {delta && (
        <div
          className={`text-xs mt-2 font-medium ${
            deltaType === "up"
              ? "text-green-400"
              : deltaType === "down"
                ? "text-red-400"
                : "text-foreground/40"
          }`}
        >
          {deltaType === "up" ? "↑" : deltaType === "down" ? "↓" : "→"} {delta}
        </div>
      )}
    </div>
  );

  return href ? <Link href={href}>{card}</Link> : card;
}

export default async function DashboardPage() {
  const github = await getGitHubIntelligence();

  const recentActivity = [
    { action: "Project updated", entity: "Projects-Showcase", time: "2 min ago", type: "info" },
    { action: "New message received", entity: "Contact Form", time: "15 min ago", type: "success" },
    { action: "Blog post published", entity: "GitHub GraphQL Guide", time: "1 hr ago", type: "success" },
    { action: "Cache refreshed", entity: "GitHub Stats", time: "30 min ago", type: "neutral" },
    { action: "Analytics snapshot saved", entity: "Visitor Data", time: "1 hr ago", type: "neutral" },
  ];

  return (
    <div className="space-y-8 page-enter">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground">Dashboard</h1>
          <p className="text-sm text-foreground/40 mt-0.5">
            Welcome back, {siteConfig.name} · {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="status-dot active" />
          <span className="text-xs text-foreground/40">All systems operational</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={FolderKanban}
          label="Total Projects"
          value={20}
          delta="2 this month"
          href="/dashboard/projects"
          color="var(--cyan)"
        />
        <MetricCard
          icon={FileText}
          label="Blog Posts"
          value={6}
          delta="1 this week"
          href="/dashboard/blog"
          color="var(--violet)"
        />
        <MetricCard
          icon={MessageSquare}
          label="Messages"
          value={12}
          delta="3 unread"
          deltaType="neutral"
          href="/dashboard/messages"
          color="var(--pink)"
        />
        <MetricCard
          icon={Eye}
          label="Page Views"
          value="2.4k"
          delta="↑ 18% this week"
          href="/dashboard/analytics"
          color="var(--blue)"
        />
      </div>

      {/* GitHub Stats Row */}
      <div className="dark-panel grain rounded-3xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-black text-lg flex items-center gap-2">
            <Github className="w-5 h-5 text-foreground/60" />
            GitHub Intelligence
          </h2>
          <Link href="/github" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
            View full stats →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Repositories", value: github.totalRepositories, icon: FolderKanban },
            { label: "Total Stars", value: github.stars, icon: Star },
            { label: "Contributions", value: github.contributions, icon: Zap },
            { label: "Current Streak", value: `${github.currentStreak}d`, icon: TrendingUp },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-foreground/5/[0.04] border border-white/[0.07] p-4 text-center">
              <stat.icon className="w-4 h-4 text-cyan-300 mx-auto mb-2" />
              <div className="text-2xl font-black text-foreground">{typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}</div>
              <div className="text-xs text-foreground/40 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity + Quick Links */}
      <div className="grid gap-6 lg:grid-cols-[1fr_0.45fr]">
        {/* Activity Log */}
        <div className="glass-card rounded-3xl p-6">
          <h2 className="font-black text-lg flex items-center gap-2 mb-5">
            <Activity className="w-5 h-5 text-cyan-300" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-foreground/5/[0.03] transition-colors"
              >
                <span
                  className={`status-dot flex-shrink-0 ${
                    activity.type === "success"
                      ? "active"
                      : activity.type === "info"
                        ? "idle"
                        : ""
                  }`}
                  style={activity.type === "neutral" ? { background: "rgba(255,255,255,0.2)" } : undefined}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground/75 font-medium">{activity.action}</p>
                  <p className="text-xs text-foreground/35 truncate">{activity.entity}</p>
                </div>
                <span className="text-xs text-foreground/30 flex-shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card rounded-3xl p-6">
          <h2 className="font-black text-lg mb-5">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { href: "/dashboard/projects", label: "Add New Project", icon: FolderKanban, color: "var(--cyan)" },
              { href: "/dashboard/blog", label: "Write Blog Post", icon: FileText, color: "var(--violet)" },
              { href: "/dashboard/messages", label: "View Messages", icon: MessageSquare, color: "var(--pink)" },
              { href: "/dashboard/analytics", label: "View Analytics", icon: BarChart3, color: "var(--blue)" },
              { href: "/dashboard/settings", label: "Settings", icon: Zap, color: "var(--green)" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-foreground/5/[0.05] border border-transparent hover:border-white/[0.08] transition-all group"
              >
                <action.icon className="w-4 h-4 flex-shrink-0" style={{ color: action.color }} />
                <span className="text-sm text-foreground/65 group-hover:text-foreground transition-colors">
                  {action.label}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-foreground/20 ml-auto group-hover:text-foreground/40 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
