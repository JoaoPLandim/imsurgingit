import { NextResponse } from "next/server";
import { analyzeTranscript, analyzeTranscriptWithImage } from "@/lib/geminiService";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const text = formData.get('text') as string;

    let analysis;

    if (file) {
      // Handle file upload (image/PDF)
      const bytes = await file.arrayBuffer();
      const base64 = Buffer.from(bytes).toString('base64');
      
      if (file.type.startsWith('image/')) {
        analysis = await analyzeTranscriptWithImage(base64, file.type);
      } else {
        // For PDF/text files, you might need additional processing
        // For now, we'll treat as text
        const text = await file.text();
        analysis = await analyzeTranscript(text);
      }
    } else if (text) {
      analysis = await analyzeTranscript(text);
    } else {
      return NextResponse.json({ error: "No file or text provided" }, { status: 400 });
    }

    return NextResponse.json({ analysis });
  } catch (error: any) {
    console.error("Error analyzing transcript:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze transcript" },
      { status: 500 }
    );
  }
}