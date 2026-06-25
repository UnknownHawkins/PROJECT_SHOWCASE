"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Wifi, WifiOff } from "lucide-react";

type TechItem = { name: string; icon: string; level: number; color: string };
type Stack = Record<string, TechItem[]>;
type GitHubLang = { name: string; percentage: number; bytes: number };

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#3B82F6",
  Backend: "#10B981",
  DevOps: "#8B5CF6",
  "Auth & Security": "#EF4444",
  Database: "#F59E0B",
  "AI & ML": "#06B6D4",
  Tools: "#6B7280",
};

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3572A5",
  CSS: "#563D7C",
  HTML: "#E34C26",
  Shell: "#89E051",
  Dockerfile: "#384D54",
  Rust: "#DEA584",
  Go: "#00ADD8",
  Java: "#B07219",
};

function ProgressBar({ level, color }: { level: number; color: string }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-gray-200/60 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      />
    </div>
  );
}

function CategorySection({ name, items }: { name: string; items: TechItem[] }) {
  const catColor = CATEGORY_COLORS[name] ?? "#6B7280";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-black/8 bg-white/60 backdrop-blur-sm p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: catColor }} />
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">{name}</h3>
      </div>
      <div className="space-y-3">
        {items.map((tech) => (
          <div key={tech.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                <span>{tech.icon}</span>
                {tech.name}
              </span>
              <span className="text-xs font-bold tabular-nums" style={{ color: tech.color !== "#000000" ? tech.color : catColor }}>
                {tech.level}%
              </span>
            </div>
            <ProgressBar level={tech.level} color={tech.color !== "#000000" ? tech.color : catColor} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function GitHubLanguagesBar({ langs }: { langs: GitHubLang[] }) {
  if (!langs.length) return null;
  return (
    <div className="rounded-2xl border border-black/8 bg-white/60 backdrop-blur-sm p-5">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">GitHub — Real Language Usage</h3>
      {/* Stacked bar */}
      <div className="flex h-3 rounded-full overflow-hidden w-full mb-4 gap-px">
        {langs.map((l) => (
          <motion.div
            key={l.name}
            initial={{ width: 0 }}
            animate={{ width: `${l.percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full"
            style={{ backgroundColor: LANG_COLORS[l.name] ?? "#9CA3AF" }}
            title={`${l.name}: ${l.percentage}%`}
          />
        ))}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {langs.map((l) => (
          <div key={l.name} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: LANG_COLORS[l.name] ?? "#9CA3AF" }}
            />
            <span className="text-xs text-gray-600 font-medium">{l.name}</span>
            <span className="text-xs text-gray-400">{l.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechStackDisplay() {
  const [stack, setStack] = useState<Stack | null>(null);
  const [githubLangs, setGithubLangs] = useState<GitHubLang[]>([]);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/skills");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setStack(data.stack);
      setGithubLangs(data.githubLanguages);
      setFetchedAt(data.fetchedAt);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const categories = stack ? ["All", ...Object.keys(stack)] : [];
  const filtered = stack
    ? activeCategory === "All"
      ? Object.entries(stack)
      : Object.entries(stack).filter(([k]) => k === activeCategory)
    : [];

  return (
    <div className="space-y-6">
      {/* Status bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {error ? (
            <WifiOff className="w-3.5 h-3.5 text-red-400" />
          ) : (
            <Wifi className="w-3.5 h-3.5 text-green-500" />
          )}
          <span className="text-xs text-gray-400 font-medium">
            {loading
              ? "Fetching live data…"
              : error
              ? "Failed to load"
              : `Live • Updated ${fetchedAt ? new Date(fetchedAt).toLocaleTimeString() : "—"}`}
          </span>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors disabled:opacity-40"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeCategory === cat
                ? "text-white shadow-sm"
                : "bg-black/5 text-gray-500 hover:bg-black/10"
            }`}
            style={
              activeCategory === cat
                ? { backgroundColor: cat === "All" ? "#1A1A1A" : (CATEGORY_COLORS[cat] ?? "#1A1A1A") }
                : {}
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-black/8 bg-white/60 p-5 space-y-3 animate-pulse">
              <div className="h-3 w-24 bg-gray-200 rounded" />
              {[...Array(3)].map((_, j) => (
                <div key={j} className="space-y-1.5">
                  <div className="h-3 w-32 bg-gray-200 rounded" />
                  <div className="h-1.5 w-full bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Tech stack grid */}
      {!loading && !error && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map(([name, items]) => (
              <CategorySection key={name} name={name} items={items} />
            ))}
          </div>
          {activeCategory === "All" && <GitHubLanguagesBar langs={githubLangs} />}
        </>
      )}

      {error && (
        <div className="text-center py-12 text-gray-400">
          <WifiOff className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="text-sm">Could not load tech stack. <button onClick={fetchData} className="underline hover:text-gray-600">Retry</button></p>
        </div>
      )}
    </div>
  );
}
