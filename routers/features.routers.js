import express from "express";
import {
  rootController,
  simplePromptController,
} from "../controllers/main-features.controllers.js";
const router = express.Router();

// defining routes
router.get("/", rootController);
router.post("/simple_prompt", simplePromptController);

export default router;
