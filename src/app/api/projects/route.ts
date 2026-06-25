import { createJsonResponse } from "@/lib/security";
import { getProjectStats, searchProjects, type ProjectCategory } from "@/lib/projects";

const categories = new Set<ProjectCategory>(["fullstack", "frontend", "ai"]);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const rawCategory = url.searchParams.get("category") ?? undefined;
  const category = rawCategory && categories.has(rawCategory as ProjectCategory) ? (rawCategory as ProjectCategory) : undefined;
  const query = url.searchParams.get("q") ?? "";

  return createJsonResponse({
    projects: searchProjects(query, category),
    stats: getProjectStats()
  });
}
