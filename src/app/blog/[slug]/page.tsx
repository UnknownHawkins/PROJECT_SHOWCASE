import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Heart, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { ReadingProgress } from "@/components/blog/ReadingProgress";

// Sample content — in production, fetch from DB or MDX file
const sampleContent: Record<string, { title: string; excerpt: string; content: string; readingTime: number; likes: number; publishedAt: string; tags: string[] }> = {
  "building-world-class-portfolio": {
    title: "Building a World-Class Developer Portfolio in 2025",
    excerpt: "A deep dive into the architecture, tech stack, and design decisions behind building a production-grade portfolio platform.",
    readingTime: 12,
    likes: 47,
    publishedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    tags: ["Next.js", "TypeScript", "Architecture"],
    content: `
# Building a World-Class Developer Portfolio in 2025

Creating a developer portfolio that stands out requires more than just listing projects. It needs to be a **production-grade platform** that demonstrates your engineering capabilities.

## Why Go Full-Stack?

Most portfolios are static sites. But a full-stack portfolio lets you showcase:

- **Architecture skills** — database design, API patterns, caching
- **Security practices** — auth, RBAC, rate limiting
- **Performance engineering** — ISR, streaming, lazy loading
- **DevOps knowledge** — Docker, CI/CD, deployment strategies

## The Tech Stack

\`\`\`typescript
// Core stack
const stack = {
  frontend: ["Next.js 15", "TypeScript", "TailwindCSS v4"],
  backend: ["Prisma", "PostgreSQL", "Redis"],
  auth: ["Clerk", "RBAC"],
  deployment: ["Vercel", "Railway", "Upstash"]
};
\`\`\`

## Database Design

The Prisma schema includes 17 models covering everything from projects to visitor analytics:

\`\`\`prisma
model Project {
  id          String @id @default(cuid())
  slug        String @unique
  title       String
  status      ProjectStatus @default(ACTIVE)
  technologies ProjectTechnology[]
  // ...20+ more fields
}
\`\`\`

## GitHub Intelligence

Rather than manually updating stats, we fetch live data via GitHub's GraphQL API:

\`\`\`graphql
query GitHubProfile($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}
\`\`\`

## Conclusion

Building a portfolio as a SaaS product teaches you more than any tutorial. You encounter real problems: rate limits, caching strategies, auth edge cases, and performance bottlenecks.

The result is a portfolio that doesn't just _tell_ people you can build things — it _shows_ them.
    `,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = sampleContent[slug];

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = sampleContent[slug];

  if (!post) notFound();

  return (
    <>
      <ReadingProgress />
      <SiteHeader />
      <main className="page-enter">
        {/* Hero */}
        <div className="mx-auto max-w-3xl px-5 py-24 md:px-8">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span key={tag} className="badge-cyan">{tag}</span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-black tracking-tight leading-tight md:text-5xl text-foreground mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-foreground/45 pb-8 border-b border-white/[0.08]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime} min read</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-pink-400" />
              <span>{post.likes} likes</span>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose-portfolio mt-10"
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/^# (.+)$/gm, "<h1>$1</h1>")
                .replace(/^## (.+)$/gm, "<h2>$1</h2>")
                .replace(/^### (.+)$/gm, "<h3>$1</h3>")
                .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                .replace(/`([^`]+)`/g, "<code>$1</code>")
                .replace(/```(\w+)?\n([\s\S]+?)```/g, "<pre><code>$2</code></pre>")
                .replace(/^- (.+)$/gm, "<li>$1</li>")
                .replace(/\n\n/g, "</p><p>")
                .replace(/^(?!<[hpuo])/gm, "<p>")
                .replace(/<\/p>(?=\s*<[hpuo])/g, "</p>"),
            }}
          />

          {/* Like button */}
          <div className="mt-12 pt-8 border-t border-white/[0.08] flex items-center gap-4">
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-semibold hover:bg-pink-500/20 transition-colors"
              aria-label="Like this post"
            >
              <Heart className="w-4 h-4" />
              Like this post · {post.likes}
            </button>
            <Link
              href="/blog"
              className="text-sm text-foreground/40 hover:text-foreground transition-colors"
            >
              ← More posts
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export async function generateStaticParams() {
  return Object.keys(sampleContent).map((slug) => ({ slug }));
}
