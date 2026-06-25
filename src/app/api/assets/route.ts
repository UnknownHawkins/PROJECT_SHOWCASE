import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

const ASSETS_DIR = path.join(process.cwd(), "public", "assets");

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");

  // List all asset files
  if (!file) {
    try {
      const files = fs.readdirSync(ASSETS_DIR).filter((f) =>
        [".txt", ".md", ".pdf"].some((ext) => f.endsWith(ext))
      );
      return NextResponse.json({ files });
    } catch {
      return NextResponse.json({ files: [] });
    }
  }

  // Serve a specific file content
  const safeName = path.basename(file); // prevent path traversal
  const filePath = path.join(ASSETS_DIR, safeName);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const content = fs.readFileSync(filePath, "utf-8");
  return NextResponse.json({ name: safeName, content });
}
