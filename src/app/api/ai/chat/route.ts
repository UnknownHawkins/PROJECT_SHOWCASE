import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";
import * as path from "path";

// ─── Load all assets from public/assets/ ────────────────────────────────────
function loadAssets(): Record<string, string> {
  const assetsDir = path.join(process.cwd(), "public", "assets");
  const result: Record<string, string> = {};
  try {
    if (!fs.existsSync(assetsDir)) return result;
    const files = fs.readdirSync(assetsDir);
    for (const file of files) {
      if (file.endsWith(".txt") || file.endsWith(".md")) {
        result[file] = fs.readFileSync(path.join(assetsDir, file), "utf-8");
      }
    }
  } catch {
    // silently fail — assets are optional
  }
  return result;
}

// ─── Build system prompt with injected asset content ─────────────────────────
function buildSystemPrompt(assets: Record<string, string>): string {
  const assetContext = Object.entries(assets)
    .map(([name, content]) => `=== FILE: ${name} ===\n${content}`)
    .join("\n\n");

  return `You are an intelligent and friendly AI assistant for Anubhav Singh's personal developer portfolio website.

You have access to Anubhav's personal documents listed below. Use them to answer questions accurately.

${assetContext}

--- BEHAVIOR RULES ---
1. Answer questions about Anubhav using the files above as your primary source of truth.
2. If a question is about resume, skills, projects, certificates, or personal info — answer from the documents.
3. If you reference information found in a specific file, ALWAYS end your response with this exact format on a new line:
   SOURCE_FILE: <filename>
   Only include ONE source file that is most relevant. Use exact filenames like: resume.txt, aboutme.txt, certificates.txt, projects.txt
4. If the user asks to "show" or "view" a document, tell them to click the "Show" button that will appear.
5. Keep responses concise (2-5 sentences) unless the user asks for full details.
6. Be professional, warm, and helpful.
7. For hiring/collaboration inquiries, point them to the Contact section.`;
}

// ─── Retry logic for Gemini (handles 503 overload) ──────────────────────────
async function generateWithRetry(
  ai: GoogleGenAI,
  prompt: string,
  retries = 2
): Promise<string> {
  const models = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-1.5-pro"];
  let lastError = "";

  for (const model of models) {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
        });
        if (response.text) return response.text;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        lastError = msg;
        // If it's a 503 overload, wait briefly then try next model
        if (msg.includes("503") || msg.includes("UNAVAILABLE") || msg.includes("overload")) {
          await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
          continue;
        }
        // Non-retryable error — break to next model
        break;
      }
    }
  }

  throw new Error(lastError || "All Gemini models failed.");
}

// ─── POST Handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Gemini API key is not configured." }, { status: 500 });
  }

  try {
    const { messages } = await req.json();
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    const latestMessage = messages[messages.length - 1]?.content;
    if (!latestMessage) {
      return NextResponse.json({ error: "Empty message." }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const assets = loadAssets();
    const systemPrompt = buildSystemPrompt(assets);

    const fullPrompt = `${systemPrompt}\n\nUser Question: ${latestMessage}`;
    const rawText = await generateWithRetry(ai, fullPrompt);

    // ─── Parse SOURCE_FILE from response ────────────────────────────
    const sourceMatch = rawText.match(/SOURCE_FILE:\s*(\S+)/i);
    const sourceFile = sourceMatch?.[1] ?? null;
    // Clean the source annotation from the visible text
    const text = rawText.replace(/\n?SOURCE_FILE:\s*\S+/i, "").trim();

    return NextResponse.json({ text, sourceFile });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("AI Chat Error:", message);
    return NextResponse.json(
      { error: `I'm having trouble connecting right now. Please try again in a moment.` },
      { status: 500 }
    );
  }
}
