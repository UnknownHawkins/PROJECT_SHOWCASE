"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronLeft,
  User,
  Bell,
  Zap,
  ExternalLink,
} from "lucide-react";
import { Github } from "@/components/icons";
import { siteConfig } from "@/config/site";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/dashboard/projects", icon: FolderKanban, label: "Projects" },
      { href: "/dashboard/blog", icon: FileText, label: "Blog Posts" },
    ],
  },
  {
    label: "Engagement",
    items: [
      { href: "/dashboard/messages", icon: MessageSquare, label: "Messages" },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/dashboard/settings", icon: Settings, label: "Settings" },
    ],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/[0.06]">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xs font-black text-black">
              {siteConfig.name.charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-foreground truncate">{siteConfig.name}</p>
              <p className="text-[10px] text-foreground/35">Admin Dashboard</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-foreground/5 text-foreground/40 hover:text-foreground transition-all"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className="w-4 h-4 transition-transform duration-300"
            style={{ transform: collapsed ? "rotate(180deg)" : "none" }}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-0.5 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            {!collapsed && (
              <p className="px-4 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/25">
                {group.label}
              </p>
            )}
            {group.items.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-nav-item ${isActive ? "active" : ""}`}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="nav-icon" />
                  {!collapsed && <span className="text-sm">{item.label}</span>}
                  {isActive && !collapsed && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/[0.06] p-3 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="sidebar-nav-item text-foreground/35 hover:text-foreground"
          title={collapsed ? "View Site" : undefined}
        >
          <ExternalLink className="nav-icon" />
          {!collapsed && <span className="text-xs">View Site</span>}
        </Link>
        <Link
          href={siteConfig.links.github}
          target="_blank"
          className="sidebar-nav-item text-foreground/35 hover:text-foreground"
          title={collapsed ? "GitHub" : undefined}
        >
          <Github className="nav-icon" />
          {!collapsed && <span className="text-xs">GitHub</span>}
        </Link>
      </div>
    </aside>
  );
}
