import { NextResponse } from "next/server";
import { generateScheduleAdvice } from "@/lib/geminiService";
import sfuApi from "@/lib/sfuApi";

export async function POST(req: Request) {
  try {
    const { message, transcriptAnalysis } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Try to extract department from message for course data
    let sfuCourseData = null;
    const departmentMatch = message.match(/\b(CMPT|MATH|PHYS|ENGL|HIST|CHEM|BIOL|ECON|PSYC|STAT)\b/i);
    
    if (departmentMatch) {
      try {
        const { year, term } = sfuApi.getCurrentTerm();
        const courses = await sfuApi.getCourses(year, term, departmentMatch[0].toUpperCase());
        sfuCourseData = courses.slice(0, 10); // Limit to first 10 courses to avoid token limits
      } catch (error) {
        console.log('Could not fetch SFU course data, continuing without it:', error.message);
      }
    }

    const response = await generateScheduleAdvice(message, transcriptAnalysis, sfuCourseData);

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error("Error generating response:", error);
    
    // Return a user-friendly error message
    let errorMessage = "I'm having trouble processing your request right now. ";
    
    if (error.message.includes('API Error')) {
      errorMessage += "There seems to be an issue with the AI service. Please try again in a moment.";
    } else if (error.message.includes('Invalid response structure')) {
      errorMessage += "I received an unexpected response. Please try rephrasing your question.";
    } else {
      errorMessage += "Please try again or contact support if the issue persists.";
    }
    
    return NextResponse.json({ response: errorMessage });
  }
}