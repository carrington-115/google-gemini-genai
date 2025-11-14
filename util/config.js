import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

// gemini model
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// open ai API using Gemini as model
export const openAIAgent = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: process.env.BASE_URL,
});

export async function getAIResponse(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (err) {
    if (err) {
      throw new Error(err);
    }
  }
}
