import type { Metadata } from "next";
import { BookOpen, Search, Tag } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog/BlogCard";
import { GsapReveal } from "@/components/motion/gsap-reveal";
import { siteConfig } from "@/config/site";
import type { BlogPost } from "@/types";

export const metadata: Metadata = {
  title: "Blog",
  description: `Technical articles, tutorials, and engineering insights by ${siteConfig.name}.`,
};

// Sample posts — replace with DB queries once Prisma is connected
const samplePosts: BlogPost[] = [
  {
    id: "1",
    slug: "building-world-class-portfolio",
    title: "Building a World-Class Developer Portfolio in 2025",
    excerpt:
      "A deep dive into the architecture, tech stack, and design decisions behind building a production-grade portfolio platform with Next.js 15, TypeScript, and Prisma.",
    content: "",
    published: true,
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 12,
    likes: 47,
    tags: ["Next.js", "TypeScript", "Architecture"],
    category: { id: "1", name: "Engineering", slug: "engineering" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    slug: "github-graphql-api-guide",
    title: "Mastering the GitHub GraphQL API: A Complete Guide",
    excerpt:
      "Learn how to fetch rich GitHub data — contribution calendars, repository analytics, language breakdowns, and more — using the GraphQL API with proper caching.",
    content: "",
    published: true,
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 8,
    likes: 31,
    tags: ["GitHub", "GraphQL", "API"],
    category: { id: "1", name: "Engineering", slug: "engineering" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    slug: "prisma-postgresql-best-practices",
    title: "Prisma + PostgreSQL: Production Best Practices",
    excerpt:
      "Everything I've learned about designing scalable Prisma schemas, handling migrations, query optimization, and connection pooling in production environments.",
    content: "",
    published: true,
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 10,
    likes: 62,
    tags: ["Prisma", "PostgreSQL", "Database"],
    category: { id: "2", name: "Backend", slug: "backend" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    slug: "framer-motion-advanced-patterns",
    title: "Advanced Framer Motion Patterns for 2025",
    excerpt:
      "Beyond the basics — creating scroll-linked animations, layout animations, shared element transitions, and gesture-driven UIs with Framer Motion and Next.js.",
    content: "",
    published: true,
    publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 7,
    likes: 89,
    tags: ["Framer Motion", "Animation", "React"],
    category: { id: "3", name: "Frontend", slug: "frontend" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    slug: "enterprise-auth-with-clerk",
    title: "Enterprise Authentication with Clerk: RBAC, Sessions & Audit Logs",
    excerpt:
      "A comprehensive guide to implementing production-grade authentication with Clerk — including role-based access control, session management, and security audit logging.",
    content: "",
    published: true,
    publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 11,
    likes: 54,
    tags: ["Auth", "Security", "Clerk"],
    category: { id: "4", name: "Security", slug: "security" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    slug: "redis-caching-strategies",
    title: "Redis Caching Strategies for Next.js Applications",
    excerpt:
      "Practical patterns for implementing Redis caching with Upstash in Next.js — from simple key-value caching to complex invalidation strategies and rate limiting.",
    content: "",
    published: true,
    publishedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 9,
    likes: 41,
    tags: ["Redis", "Caching", "Performance"],
    category: { id: "1", name: "Engineering", slug: "engineering" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const allTags = Array.from(new Set(samplePosts.flatMap((p) => p.tags)));
const categories = Array.from(
  new Map(
    samplePosts
      .filter((p) => p.category)
      .map((p) => [p.category!.slug, p.category!])
  ).values()
);

export default function BlogPage() {
  const [featured, ...rest] = samplePosts;

  return (
    <>
      <SiteHeader />
      <main className="page-enter mx-auto max-w-7xl px-5 py-24 md:px-8">
        {/* Header */}
        <GsapReveal>
          <Badge>Blog</Badge>
          <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
            Thoughts &amp;{" "}
            <span className="text-gradient">Insights</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground/55 leading-8">
            Deep dives into full-stack engineering, architecture decisions, performance
            optimization, and modern development practices.
          </p>
        </GsapReveal>

        {/* Filter bar */}
        <GsapReveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
              <Search className="w-4 h-4 text-foreground/40" />
              <span className="text-sm text-foreground/35">Search posts...</span>
            </div>
            <div className="h-5 w-px bg-foreground/10" />
            <span className="badge-cyan">All</span>
            {categories.map((cat) => (
              <span key={cat.slug} className="badge-violet cursor-pointer hover:opacity-80 transition-opacity">
                {cat.name}
              </span>
            ))}
          </div>
        </GsapReveal>

        {/* Posts Grid */}
        <div className="mt-12 space-y-12">
          {/* Featured */}
          {featured && (
            <GsapReveal delay={0.15}>
              <BlogCard post={featured} featured />
            </GsapReveal>
          )}

          {/* Rest */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <GsapReveal key={post.id} delay={i * 0.05}>
                <BlogCard post={post} />
              </GsapReveal>
            ))}
          </div>
        </div>

        {/* Tags cloud */}
        <GsapReveal>
          <div className="mt-16 dark-panel grain rounded-3xl p-8">
            <h2 className="text-xl font-black flex items-center gap-2 mb-5">
              <Tag className="w-5 h-5 text-cyan-300" />
              Topics
            </h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <span key={tag} className="badge-cyan cursor-pointer hover:opacity-75 transition-opacity">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </GsapReveal>
      </main>
      <SiteFooter />
    </>
  );
}
