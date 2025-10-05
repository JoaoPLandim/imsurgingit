import { GoogleGenAI } from "@google/genai";
import fs from "fs";

// Read your image file and encode it as base64
const imagePath = "./public/file.svg"; // Change to your image path
const imageBuffer = fs.readFileSync(imagePath);
const imageBase64 = imageBuffer.toString("base64");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

export async function analyzeTranscript(transcriptText) {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an academic advisor for Simon Fraser University (SFU). Analyze this transcript and extract:
1. Student's major/program
2. Completed courses (course codes and names)
3. Current GPA if available
4. Credits completed
5. Any failed or repeated courses
6. Remaining degree requirements (if identifiable)

Please format your response as a JSON object with these fields:
- program: string
- completedCourses: array of {code, name, grade, credits}
- gpa: number (if available)
- totalCredits: number
- failedCourses: array (if any)
- analysis: string (general observations)

Here's the transcript:
${transcriptText}`
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error analyzing transcript:', error);
    throw error;
  }
}

export async function generateScheduleAdvice(userQuery, transcriptAnalysis = null, sfuCourseData = null) {
  try {
    let contextPrompt = `You are an academic advisor for Simon Fraser University (SFU). Help with this student question: ${userQuery}`;
    
    if (transcriptAnalysis) {
      contextPrompt = `Based on the student's transcript analysis: ${transcriptAnalysis}\n\nStudent question: ${userQuery}`;
    }
    
    if (sfuCourseData) {
      contextPrompt += `\n\nAvailable SFU course data: ${JSON.stringify(sfuCourseData)}`;
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${contextPrompt}

Please provide helpful, specific advice for SFU students. Include:
- Relevant course recommendations with actual SFU course codes
- Scheduling tips
- Prerequisite information
- Registration deadlines if relevant
- Any important academic policies

Keep responses conversational but informative.`
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating advice:', error);
    throw error;
  }
}

export async function analyzeTranscriptWithImage(imageBase64, mimeType) {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an academic advisor for Simon Fraser University (SFU). Analyze this transcript image and extract:
1. Student's major/program
2. Completed courses (course codes and names)
3. Current GPA if available
4. Credits completed
5. Any failed or repeated courses

Please format your response as a JSON object with these fields:
- program: string
- completedCourses: array of {code, name, grade, credits}
- gpa: number (if available)
- totalCredits: number
- analysis: string (summary of academic progress)`
              },
              {
                inlineData: {
                  mimeType: mimeType,
                  data: imageBase64
                }
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error analyzing transcript image:', error);
    throw error;
  }
}
