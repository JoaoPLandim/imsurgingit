import { NextResponse } from "next/server";
import { generateScheduleAdvice } from "@/lib/geminiService";

export async function POST(req: Request) {
  try {
    const { message, transcriptAnalysis } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const response = await generateScheduleAdvice(message, transcriptAnalysis);

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error("Error generating response:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate response" },
      { status: 500 }
    );
  }
}