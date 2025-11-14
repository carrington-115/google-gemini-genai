import { uploadFileToStore } from "../util/rag.js";

export const uploadToStore = async (req, res, next) => {
  const file = "../public/african_recipes_1.pdf";
  const displayName = "The Grok African Recipes";
  try {
    const uploadFile = await uploadFileToStore(displayName, file);
    req.displayName = uploadFile;
    return next();
  } catch (error) {
    return next(err);
  }
};
