import { openAIResponse } from "../util/prompts.js";

// simple agent

export const simpleAgentController = async (req, res) => {
  const { userPrompt } = req.body;

  try {
    const response_message = await openAIResponse(userPrompt);
    if (!response_message) {
      throw new Error("Some server error occurred");
    }
    res.status(201).json({
      success: true,
      response: response_message,
    });
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: error.message });
  }
};
