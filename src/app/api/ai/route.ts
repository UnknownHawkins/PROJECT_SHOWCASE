import { NextResponse } from "next/server";
import { aiToolSchema } from "@/schemas/ai";
import { runAiTool } from "@/services/ai";

export async function POST(request: Request) {
  const parsed = aiToolSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid AI request." }, { status: 400 });
  }

  const result = await runAiTool(parsed.data);
  return NextResponse.json(result);
}
