import express from "express";
import { GoogleGenAI } from "@google/genai/node";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function getAIResponse(prompt) {
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

const app = express();
app.use([express.json(), express.urlencoded({ extended: false })]);

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});

app.post("/simple_prompt", async (req, res) => {
  const { prompt } = req.body;
  const generatedResponse = await getAIResponse(prompt);
  res.status(201).json({
    success: true,
    prompt: generatedResponse,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on ", process.env.PORT);
});
