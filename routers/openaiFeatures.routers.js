import express from "express";
import {
  generateRecipeController,
  getEmbeddingsController,
  getRestaurantDetailsController,
  simpleAgentController,
} from "../controllers/openai.controllers.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Prompting with OpenAI" });
});
router.post("/simple", simpleAgentController);
router.post("/function/recipe", generateRecipeController);
router.post("/structure/restaurants", getRestaurantDetailsController);
router.post("/embeddings", getEmbeddingsController);

export default router;
