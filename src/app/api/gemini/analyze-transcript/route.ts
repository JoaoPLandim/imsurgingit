import { NextResponse } from "next/server";
import { analyzeTranscript, analyzeTranscriptFile } from "@/lib/geminiService";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const text = formData.get("text") as string | null;

    let analysis: string;

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 413 });
      }

      if (file.type.startsWith("image/") || file.type === "application/pdf") {
        // Gemini accepts images and PDFs directly as inline data
        const bytes = await file.arrayBuffer();
        const base64 = Buffer.from(bytes).toString("base64");
        analysis = await analyzeTranscriptFile(base64, file.type);
      } else {
        const fileText = await file.text();
        analysis = await analyzeTranscript(fileText);
      }
    } else if (text) {
      analysis = await analyzeTranscript(text);
    } else {
      return NextResponse.json({ error: "No file or text provided" }, { status: 400 });
    }

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Error analyzing transcript:", error);
    return NextResponse.json(
      { error: "Failed to analyze transcript. Please try again." },
      { status: 500 }
    );
  }
}
