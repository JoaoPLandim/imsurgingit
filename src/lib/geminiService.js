const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const TRANSCRIPT_PROMPT = `You are an academic advisor for Simon Fraser University (SFU). Analyze this transcript and extract:
1. Student's major/program
2. Completed courses (course codes and names)
3. Current GPA if available
4. Credits completed
5. Any failed or repeated courses

Respond with a JSON object with these fields:
- program: string
- completedCourses: array of {code, name, grade, credits}
- gpa: number (if available)
- totalCredits: number
- failedCourses: array of strings (if any)
- analysis: string (summary of academic progress)`;

function getApiKey() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
  }
  return key;
}

async function generateContent(parts, { json = false } = {}) {
  const body = { contents: [{ parts }] };
  if (json) {
    body.generationConfig = { responseMimeType: "application/json" };
  }

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": getApiKey(),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini API Error:", response.status, errorText);
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? "")
    .join("");

  if (!text) {
    console.error("Unexpected API response structure:", JSON.stringify(data));
    throw new Error("Invalid response structure from Gemini API");
  }

  return text;
}

export async function analyzeTranscript(transcriptText) {
  return generateContent(
    [{ text: `${TRANSCRIPT_PROMPT}\n\nHere's the transcript:\n${transcriptText}` }],
    { json: true }
  );
}

export async function analyzeTranscriptFile(fileBase64, mimeType) {
  return generateContent(
    [
      { text: TRANSCRIPT_PROMPT },
      { inlineData: { mimeType, data: fileBase64 } },
    ],
    { json: true }
  );
}

export async function generateScheduleAdvice(userQuery, transcriptAnalysis = null, sfuCourseData = null) {
  let contextPrompt = `You are an academic advisor for Simon Fraser University (SFU). Help with this student question: ${userQuery}`;

  if (transcriptAnalysis) {
    contextPrompt = `Based on the student's transcript analysis: ${transcriptAnalysis}\n\nStudent question: ${userQuery}`;
  }

  if (sfuCourseData) {
    contextPrompt += `\n\nAvailable SFU course data: ${JSON.stringify(sfuCourseData)}`;
  }

  return generateContent([
    {
      text: `${contextPrompt}

Please provide helpful, specific advice for SFU students. Include:
- Relevant course recommendations with actual SFU course codes
- Scheduling tips
- Prerequisite information
- Registration deadlines if relevant
- Any important academic policies

Keep responses conversational but informative.`,
    },
  ]);
}
