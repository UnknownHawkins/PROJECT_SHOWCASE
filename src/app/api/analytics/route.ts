import { NextResponse } from "next/server";
import { getVisitorSnapshot } from "@/services/analytics";

export async function GET() {
  return NextResponse.json(getVisitorSnapshot(), {
    headers: {
      "Cache-Control": "s-maxage=60, stale-while-revalidate=300"
    }
  });
}
