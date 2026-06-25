import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  await requireAdmin();
  const db = await getDb();

  if (!db) {
    return NextResponse.json({
      messages: [
        {
          id: "sample",
          name: "System",
          email: "system@example.com",
          status: "NEW",
          body: "Configure DATABASE_URL to persist and read real messages."
        }
      ]
    });
  }

  const prisma = db as { message: { findMany: (args: unknown) => Promise<unknown> } };
  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });

  return NextResponse.json({ messages });
}
