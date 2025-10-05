import { GoogleGenAI } from "@google/genai";
import fs from "fs";

// Read your image file and encode it as base64
const imagePath = "./public/file.svg"; // Change to your image path
const imageBuffer = fs.readFileSync(imagePath);
const imageBase64 = imageBuffer.toString("base64");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          { text: "Describe the contents of this image." },
          {
            inlineData: {
              mimeType: "image/svg+xml", // Change to your image's MIME type
              data: imageBase64,
            },
          },
        ],
      },
    ],
  });
  console.log(response.text);
}

main();
