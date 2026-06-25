import { NextResponse } from "next/server";

// ─── Curated Tech Stack (these are "claimed" by the developer) ───────────────
const CURATED_STACK = {
  Frontend: [
    { name: "Next.js 15", icon: "⚡", level: 90, color: "#000000" },
    { name: "React", icon: "⚛️", level: 92, color: "#61DAFB" },
    { name: "TypeScript", icon: "🔷", level: 90, color: "#3178C6" },
    { name: "Tailwind CSS", icon: "🎨", level: 93, color: "#06B6D4" },
    { name: "Framer Motion", icon: "🎬", level: 80, color: "#FF0055" },
    { name: "Three.js", icon: "🌐", level: 65, color: "#049EF4" },
    { name: "GSAP", icon: "🔄", level: 70, color: "#88CE02" },
  ],
  Backend: [
    { name: "Node.js", icon: "🟩", level: 86, color: "#339933" },
    { name: "Express.js", icon: "🚂", level: 83, color: "#000000" },
    { name: "Prisma ORM", icon: "🔺", level: 85, color: "#2D3748" },
    { name: "GraphQL", icon: "◈", level: 74, color: "#E10098" },
    { name: "REST APIs", icon: "🔗", level: 90, color: "#FF6C37" },
  ],
  DevOps: [
    { name: "Docker", icon: "🐳", level: 76, color: "#2496ED" },
    { name: "GitHub Actions", icon: "⚙️", level: 80, color: "#2088FF" },
    { name: "Vercel", icon: "▲", level: 90, color: "#000000" },
    { name: "Railway", icon: "🚄", level: 72, color: "#7A3EDE" },
  ],
  "Auth & Security": [
    { name: "Clerk", icon: "🔐", level: 88, color: "#6C47FF" },
    { name: "JWT", icon: "🎟️", level: 84, color: "#D63AFF" },
    { name: "RBAC", icon: "🛡️", level: 80, color: "#E11D48" },
    { name: "NextAuth", icon: "🔑", level: 75, color: "#2563EB" },
  ],
  Database: [
    { name: "PostgreSQL", icon: "🐘", level: 82, color: "#336791" },
    { name: "Redis", icon: "🔴", level: 73, color: "#DC382D" },
    { name: "Supabase", icon: "🟢", level: 78, color: "#3ECF8E" },
    { name: "Neon DB", icon: "💠", level: 76, color: "#00E5BF" },
  ],
  "AI & ML": [
    { name: "Gemini API", icon: "✨", level: 75, color: "#4285F4" },
    { name: "OpenAI API", icon: "🤖", level: 72, color: "#10A37F" },
    { name: "LangChain", icon: "🔗", level: 60, color: "#3C82F6" },
    { name: "Vercel AI SDK", icon: "🧠", level: 68, color: "#000000" },
  ],
  Tools: [
    { name: "Git", icon: "📦", level: 92, color: "#F05032" },
    { name: "VS Code", icon: "💻", level: 95, color: "#007ACC" },
    { name: "Figma", icon: "🎭", level: 70, color: "#F24E1E" },
    { name: "Postman", icon: "📮", level: 82, color: "#FF6C37" },
    { name: "pnpm", icon: "📦", level: 85, color: "#F69220" },
  ],
};

// ─── Fetch real language stats from GitHub ────────────────────────────────────
async function fetchGitHubLanguages() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME ?? "UnknownHawkins";

  if (!token) return null;

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) return null;
    const repos: Array<{ language: string | null; fork: boolean; size: number }> = await res.json();

    // Aggregate language counts from non-fork repos
    const langCounts: Record<string, number> = {};
    for (const repo of repos) {
      if (!repo.fork && repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] ?? 0) + repo.size;
      }
    }

    const total = Object.values(langCounts).reduce((a, b) => a + b, 0);
    return Object.entries(langCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 12)
      .map(([lang, size]) => ({
        name: lang,
        percentage: Math.round((size / total) * 100),
        bytes: size,
      }));
  } catch {
    return null;
  }
}

export const revalidate = 3600; // ISR: refresh every hour

export async function GET() {
  const githubLanguages = await fetchGitHubLanguages();

  return NextResponse.json({
    stack: CURATED_STACK,
    githubLanguages: githubLanguages ?? [],
    fetchedAt: new Date().toISOString(),
  });
}
