import { ai } from "../util/config.js";
import { ragModelGenerator } from "../util/functions.js";
import { createfileSearchStore, uploadFileToStore } from "../util/rag.js";

export const postUploadFileToStore = async (req, res) => {
  const displayName = "african-recipes-01";
  const file = "./public/african_recipes_1.pdf";
  try {
    const uploadedFile = await uploadFileToStore(displayName, file);
    req.displayName = uploadedFile;
    res.status(201).json({ file: uploadedFile });
  } catch (error) {
    console.error(error);
  }
};

export const createNewRagChatController = async (req, res) => {
  const { recipePrompt } = req.body;
  const storeName = "fileSearchStores/africanrecipes01-5x2l1zlf8vpi";

  console.log("Display name: ", storeName);

  try {
    const ragResponse = await ragModelGenerator(recipePrompt, storeName);
    if (!ragResponse) {
      throw new Error("An error occurred when setting up response");
    }
    res.status(201).json({ respone: ragResponse });
  } catch (error) {
    console.error(error);
  }
};

export const getAllStoresController = async (req, res) => {
  try {
    const stores = await ai.fileSearchStores.list();
    res.json({ stores: stores });
  } catch (error) {
    console.error(error);
  }
};

export const deleteStoresController = async (req, res) => {
  const { storeName } = req.body;
  try {
    const store = await ai.fileSearchStores.delete({
      name: storeName,
      config: { force: true },
    });
    res.json({ deleted: store });
  } catch (error) {
    console.error(error);
  }
};

export const getRagFilesController = async (req, res) => {
  try {
    const fileSearchStore = await createfileSearchStore(req.displayName);
    const docs = await ragModel.fileSearchStores.documents.list({
      parent: fileSearchStore.name,
    });
  } catch (error) {
    console.error(error);
  }
};
