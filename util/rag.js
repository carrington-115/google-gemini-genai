/**
 * This file is to build all the functionalities related to rags
 *
 */

import { ai } from "./config.js";

// set up the rag model
const ragModel = ai;

// create the file in memory
export const createfileSearchStore = async (filename) => {
  try {
    const fileSearchStore = await ragModel.fileSearchStores.create({
      config: { displayName: filename },
    });

    if (!fileSearchStore) {
      const err = new Error();
      err.message = "Some error occurred while creating the file";
      throw err;
    }
    return fileSearchStore;
  } catch (error) {
    throw new Error(error);
  }
};

// upload the file
export const uploadFileToStore = async (filename, file) => {
  try {
    const fileSearchStore = await createfileSearchStore(filename);
    const uploadFile = await ragModel.fileSearchStores.uploadToFileSearchStore({
      file: file,
      fileSearchStoreName: fileSearchStore.name,
      config: {
        displayName: filename,
      },
    });

    if (!uploadFile) {
      const error = new Error();
      error.message = "Some error occurred while uploading the file";
      throw error;
    }

    // control when upload delay
    if (!uploadFile.done) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      uploadFile = await ragModel.operations.get({ operation });
    }
  } catch (error) {
    throw new Error(error);
  }
};
