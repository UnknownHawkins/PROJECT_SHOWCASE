import type { Metadata } from "next";
import { FileText, Plus, Pencil, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Blog Posts" };

const samplePosts = [
  {
    id: "1",
    slug: "building-world-class-portfolio",
    title: "Building a World-Class Developer Portfolio in 2025",
    published: true,
    publishedAt: "2026-06-22",
    readingTime: 12,
    likes: 47,
    category: "Engineering",
    tags: ["Next.js", "TypeScript", "Architecture"],
  },
  {
    id: "2",
    slug: "github-graphql-api-guide",
    title: "Mastering the GitHub GraphQL API: A Complete Guide",
    published: true,
    publishedAt: "2026-06-17",
    readingTime: 8,
    likes: 31,
    category: "Engineering",
    tags: ["GitHub", "GraphQL", "API"],
  },
  {
    id: "3",
    slug: "prisma-postgresql-best-practices",
    title: "Prisma + PostgreSQL: Production Best Practices",
    published: true,
    publishedAt: "2026-06-10",
    readingTime: 10,
    likes: 62,
    category: "Backend",
    tags: ["Prisma", "PostgreSQL", "Database"],
  },
  {
    id: "4",
    slug: "framer-motion-advanced-patterns",
    title: "Advanced Framer Motion Patterns for 2025",
    published: true,
    publishedAt: "2026-06-03",
    readingTime: 7,
    likes: 89,
    category: "Frontend",
    tags: ["Framer Motion", "Animation", "React"],
  },
  {
    id: "5",
    slug: "enterprise-auth-with-clerk",
    title: "Enterprise Authentication with Clerk: RBAC, Sessions & Audit Logs",
    published: true,
    publishedAt: "2026-05-25",
    readingTime: 11,
    likes: 54,
    category: "Security",
    tags: ["Auth", "Security", "Clerk"],
  },
  {
    id: "6",
    slug: "redis-caching-strategies",
    title: "Redis Caching Strategies for Next.js Applications",
    published: false,
    publishedAt: null,
    readingTime: 9,
    likes: 0,
    category: "Engineering",
    tags: ["Redis", "Caching", "Performance"],
  },
];

export default function DashboardBlogPage() {
  return (
    <div className="space-y-6 page-enter">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <FileText className="w-6 h-6 text-cyan-300" />
            Blog Posts
          </h1>
          <p className="text-sm text-foreground/40 mt-0.5">{samplePosts.length} posts in your library</p>
        </div>
        <Button size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Post
        </Button>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Article</th>
              <th>Category</th>
              <th>Status</th>
              <th>Likes / Time</th>
              <th>Topics</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {samplePosts.map((post) => (
              <tr key={post.id}>
                <td>
                  <div>
                    <p className="font-semibold text-foreground truncate max-w-sm">{post.title}</p>
                    <p className="text-xs text-foreground/35 mt-0.5">
                      {post.publishedAt ? `Published ${post.publishedAt}` : "Draft"}
                    </p>
                  </div>
                </td>
                <td>
                  <span className="badge-cyan">{post.category}</span>
                </td>
                <td>
                  <span className={`badge-${post.published ? "green" : "amber"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td>
                  <div className="text-xs text-foreground/60">
                    <p>{post.likes} likes</p>
                    <p className="text-foreground/30">{post.readingTime} min read</p>
                  </div>
                </td>
                <td>
                  <div className="flex flex-wrap gap-1 max-w-[180px]">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] text-foreground/50 bg-foreground/5 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="text-foreground/30 hover:text-foreground transition-colors"
                      title="View Article"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button className="text-foreground/30 hover:text-cyan-300 transition-colors" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="text-foreground/30 hover:text-red-400 transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
