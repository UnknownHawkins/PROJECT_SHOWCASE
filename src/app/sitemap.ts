import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://anubhav.dev"; // Change to actual domain in production

  const staticPaths = [
    "",
    "/about",
    "/github",
    "/projects",
    "/blog",
    "/ai",
    "/dashboard"
  ];

  const projectSlugs = [
    "bookhub",
    "codebuddy",
    "hostel-management-system",
    "careerpath-ai",
    "life-ruination-protocol",
    "personal-portfolio"
  ];

  const blogSlugs = [
    "building-world-class-portfolio",
    "github-graphql-api-guide",
    "prisma-postgresql-best-practices",
    "framer-motion-advanced-patterns",
    "enterprise-auth-with-clerk",
    "redis-caching-strategies"
  ];

  const staticUrls = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8
  }));

  const projectUrls = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  const blogUrls = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  return [...staticUrls, ...projectUrls, ...blogUrls];
}
