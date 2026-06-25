import { getProjectBySlug } from "@/lib/projects";
import { createJsonResponse } from "@/lib/security";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return createJsonResponse({ error: "Project not found." }, { status: 404 });
  }

  return createJsonResponse({ project });
}
