import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
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

export const openAIAgent = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: process.env.BASE_URL,
});
