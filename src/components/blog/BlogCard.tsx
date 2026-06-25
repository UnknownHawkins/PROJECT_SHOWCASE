import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types";
import { Clock, Heart, Tag } from "lucide-react";

type Props = {
  post: BlogPost;
  featured?: boolean;
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

export function BlogCard({ post, featured = false }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {post.coverImage && (
        <div className={`relative overflow-hidden ${featured ? "h-64" : "h-44"}`}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="p-5">
        {/* Category & Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.category && (
            <span className="badge-violet text-[10px]">{post.category.name}</span>
          )}
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="badge-cyan text-[10px]">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className={`font-bold text-foreground leading-tight mb-2 group-hover:text-cyan-300 transition-colors ${
            featured ? "text-xl" : "text-base"
          }`}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-foreground/55 line-clamp-2 leading-5 mb-4">{post.excerpt}</p>

        {/* Footer */}
        <div className="flex items-center gap-4 text-xs text-foreground/40">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readingTime} min read</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5" />
            <span>{post.likes}</span>
          </div>
          <span className="ml-auto">
            {post.publishedAt ? timeAgo(post.publishedAt) : "Draft"}
          </span>
        </div>
      </div>
    </Link>
  );
}
