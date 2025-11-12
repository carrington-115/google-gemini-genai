import { getAIResponse } from "../util/config.js";

export const rootController = (req, res) => {
  res.status(200).json({
    message: "Hello world",
  });
};

export const simplePromptController = async (req, res) => {
  const { prompt } = req.body;
  const generatedResponse = await getAIResponse(prompt);
  res.status(201).json({
    success: true,
    prompt: generatedResponse,
  });
};
