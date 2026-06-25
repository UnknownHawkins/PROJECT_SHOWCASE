import { NextResponse } from "next/server";
import { getGitHubIntelligence } from "@/services/github";

export async function GET() {
  const data = await getGitHubIntelligence();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=1800, stale-while-revalidate=86400"
    }
  });
}
