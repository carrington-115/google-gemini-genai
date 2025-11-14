import { openAIAgent } from "./config.js";

export const generateRecipe = async (mealName) => {
  // prompt format: this parses mealName
  const generationPrompt = `
You are an expert chef. Write a complete recipe for **${mealName}** in the following exact JSON format:

{
  "history": "A brief 2‑3 sentence history of the dish.",
  "ingredients": ["item 1", "item 2", "..."],
  "steps": ["1. First step.", "2. Second step.", "..."]
}

Return **only** the JSON object, no extra text.
`.trim();

  // defining the agent messages
  const messages = [
    {
      role: "system",
      content:
        "You are an expert in generating data in JSON format and extracting the required data and sending it as JSON format",
    },
    { role: "user", content: generationPrompt },
  ];

  const agentResponse = await openAIAgent.chat.completions.create({
    model: "gemini-2.5-flash",
    messages: messages,
    response_format: { type: "json_object" },
  });
  let recipeJSON;
  try {
    recipeJSON = JSON.parse(agentResponse.choices[0].message.content);
  } catch (error) {
    throw new Error("Returned invalid JSON format");
  }
  return recipeJSON;
};

// get Restaurant details with name and city
export const generateRestaurants = async (meal, city) => {
  const systemMessage = `You are not a real expert, but you can find restaurants for meals in any location
        Generate fake restaurants in ${city} that sell ${meal} and display the restaurant data as:
        restaurant: name of restaurant
        city: name of city
        country: name of country

        **Only** generate the list of restaurants
    `;

  const userMessage = `Find all restaurants in ${city} that sell ${meal}`;
  try {
    const agentResponse = await openAIAgent.chat.completions.create({
      model: "gemini-2.5-flash",
      reasoning_effort: "low",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage },
      ],
    });

    if (!agentResponse) {
      throw new Error("There is a problem with the agent response");
    }
    return agentResponse.choices[0].message.content;
  } catch (error) {
    throw new Error("A server error occurred");
  }
};
