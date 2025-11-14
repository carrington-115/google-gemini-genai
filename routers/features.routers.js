import express from "express";
import {
  rootController,
  simplePromptController,
} from "../controllers/main-features.controllers.js";
import {
  createNewRagChatController,
  deleteStoresController,
  getAllStoresController,
  postUploadFileToStore,
} from "../controllers/rag.controllers.js";
const router = express.Router();

// defining routes
router.get("/", rootController);
router.post("/simple_prompt", simplePromptController);
router.post("/rags/chats", createNewRagChatController);
router.post("/rags/upload", postUploadFileToStore);
router.get("/rags/stores", getAllStoresController);
router.delete("/rags/delete_store", deleteStoresController);

export default router;
