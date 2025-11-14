import { uploadFileToStore } from "../util/rag.js";

export const uploadToStore = async (req, res, next) => {
  const file = "./public/african_recipes_1.pdf";
  const displayName = "The Grok African Recipes";
  try {
    await uploadFileToStore(displayName, file);
    req.displayName = displayName;
    return next();
  } catch (error) {
    return next(error);
  }
};
