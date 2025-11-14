import { ragModelGenerator } from "../util/functions.js";

export const createNewRagChatController = async (req, res) => {
  const { recipePrompt } = req.body;
  const displayName = req?.displayName;

  try {
    const ragResponse = await ragModelGenerator(recipePrompt, displayName);
    if (!ragResponse) {
      throw new Error("An error occurred when setting up response");
    }
  } catch (error) {
    console.error(error);
  }
};
