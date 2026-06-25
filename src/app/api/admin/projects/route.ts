import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { projectSchema } from "@/schemas/project";

export async function GET() {
  await requireAdmin();
  const db = await getDb();

  if (!db) {
    return NextResponse.json({ projects: [], source: "database-not-configured" });
  }

  const prisma = db as { project: { findMany: (args: unknown) => Promise<unknown> } };
  const projects = await prisma.project.findMany({ orderBy: { updatedAt: "desc" } });

  return NextResponse.json({ projects, source: "database" });
}

export async function POST(request: Request) {
  await requireAdmin();
  const parsed = projectSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid project." }, { status: 400 });
  }

  const db = await getDb();

  if (!db) {
    return NextResponse.json(
      { error: "DATABASE_URL is not configured. Project payload is valid but was not persisted." },
      { status: 503 }
    );
  }

  const prisma = db as { project: { create: (args: unknown) => Promise<unknown> } };
  const project = await prisma.project.create({ data: parsed.data });

  return NextResponse.json({ project }, { status: 201 });
}
