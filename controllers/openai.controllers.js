import {
  generateRecipe,
  generateRestaurants,
  getDataEmbeddings,
} from "../util/functions.js";
import {
  generateStructuredRestaurants,
  openAIResponse,
} from "../util/prompts.js";

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
  }
};

// Function calling
/**
 * from the example of the function calling method that is implement
 * for getting the data for the weather in a specific location
 * Let's implement a function for generating the recipe of a food
 */

export const generateRecipeController = async (req, res) => {
  const { mealName } = req.body;
  try {
    const response = await generateRecipe(mealName);
    if (!response) {
      throw new Error("Something is wrong on the ser");
    }
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getRestaurantDetailsController = async (req, res) => {
  const { meal, city } = req.body;
  try {
    const customUser = await generateRestaurants(meal, city);
    const response = await generateStructuredRestaurants(customUser);
    if (!response) {
      throw new Error();
    }
    res.status(201).json({ success: true, response: response });
  } catch (error) {
    console.error(error);
  }
};

export const getEmbeddingsController = async (req, res) => {
  const { prompt } = req.body;
  try {
    const embeddings = await getDataEmbeddings(prompt);
    res.status(201).json({ success: true, embeddings: embeddings });
  } catch (error) {
    console.error(error);
  }
};
