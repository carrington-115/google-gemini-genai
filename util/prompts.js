import { openAIAgent } from "./config.js";

export async function openAIResponse(userPrompt) {
  const responseAgent = await openAIAgent.chat.completions.create({
    model: "gemini-2.5-flash",
    reasoning_effort: "low",
    messages: [
      { role: "system", content: "You are a helpful Historian" },
      { role: "user", content: userPrompt },
    ],
  });
  return responseAgent.choices[0].message;
}
