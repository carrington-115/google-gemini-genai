import express from "express";
import { simpleAgentController } from "../controllers/openai.controllers.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Prompting with OpenAI" });
});
router.post("/simple", simpleAgentController);

export default router;
