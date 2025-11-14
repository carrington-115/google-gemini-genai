import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { openAIAgent } from "./config.js";
import { generateRecipe, generateRestaurants } from "./functions.js";
import { z } from "zod";

const restaurantData = z.object({
  name: z.string(),
  city: z.string(),
  country: z.string(),
});

const restaurants = z.object({
  restaurants: z.array(restaurantData),
});

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

export async function functionInitializer(meal) {
  const messages = [
    {
      role: "system",
      content: "You are helpful cook that gives meal recipes",
    },
    {
      role: "user",
      content: `Tell me about ${meal}`,
    },
  ];
  const tools = [
    {
      type: "function",
      function: {
        name: "get_recipe",
        description:
          "Generate a recipe for a given meal, including its history, ingredients, and step-by-step preparation instructions.",
        parameters: {
          type: "object",
          properties: {
            mealName: {
              type: "string",
              description:
                "The name of the meal or dish (e.g., 'Tacos al Pastor', 'Sushi', 'Lasagna').",
            },
          },
          required: ["mealName"],
        },
      },
    },
  ];

  try {
    const getMealName = await openAIAgent.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: messages,
      tools: tools,
      tool_choice: "auto",
    });
    const message = getMealName.choices[0].message;
    const toolCall = getMealName.choices[0].message.tool_calls;
    let mealName;

    // parsing the response further
    if (toolCall) {
      let fullMealName = [];
      for (let i = 0; i < toolCall?.length; i++) {
        const meal = JSON.parse(toolCall[i]?.function?.arguments);
        fullMealName.push(meal);
      }
      // ----------------
      // fullMealName structure
      // [{
      //    mealName: "val"
      // }, ....]
      // -----------------

      // loop over fullMealName and concatenate the name
      mealName = "";
      for (let name of fullMealName) {
        mealName.concat(name);
      }
    }
    return mealName;
  } catch (error) {
    console.error(error);
    throw new Error("Some server error ocurred");
  }
}

export const generateRecipeFromFunction = async (
  messages,
  message,
  toolCall,
  mealName
) => {
  try {
    const recipe = await generateRecipe(mealName);
    const finalRecipe = await openAIAgent.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        ...messages,
        message,
        {
          role: "tool",
          tool_call_id: toolCall?.id,
          name: toolCall?.function.name,
          content: JSON.stringify(recipe),
        },
      ],
    });

    if (!finalRecipe) {
      throw new Error("Some error occurred on the server");
    }
    return finalRecipe.choices[0].message.content;
  } catch (error) {
    console.error("An error occurred on the server: ", error);
  }
};

export const generateStructuredRestaurants = async (customPrompt) => {
  const sysMsg = `Extract all the restaurant info in the given restaurant format`;
  try {
    const restaurantFormatData = await openAIAgent.chat.completions.parse({
      model: "gemini-2.5-flash",
      messages: [
        { role: "system", content: sysMsg },
        { role: "user", content: customPrompt },
      ],
      response_format: zodResponseFormat(restaurants, "restaurants"),
    });

    if (!restaurantFormatData) {
      throw new Error("The restaurant data was not correctly generated");
    }
    return restaurantFormatData.choices[0].message.parsed;
  } catch (error) {
    throw new Error("Some error occurred on the server");
  }
};
