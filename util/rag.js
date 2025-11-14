/**
 * This file is to build all the functionalities related to rags
 *
 */

import { ai } from "./config.js";

// set up the rag model
const ragModel = ai;

// create the file in memory
export const createfileSearchStore = async (displayName) => {
  try {
    const fileSearchStore = await ragModel.fileSearchStores.create({
      config: { displayName: displayName },
    });

    if (!fileSearchStore) {
      const err = new Error();
      err.message = "Some error occurred while creating the file";
      throw err;
    }
    return fileSearchStore;
  } catch (error) {
    if (error.message.includes("already exists")) {
      throw new Error("File already exists");
    } else throw new Error(error);
  }
};

// upload the file
export const uploadFileToStore = async (displayName, file) => {
  // checking if file exists
  //   try {
  //     const fileSearchStore = await createfileSearchStore(displayName);
  //     const docs = await ragModel.fileSearchStores.documents.list({
  //       parent: fileSearchStore.name,
  //     });

  //   } catch (error) {}

  // uploading if file does not exists
  try {
    const fileSearchStore = await createfileSearchStore(displayName);
    const uploadFile = await ragModel.fileSearchStores.uploadToFileSearchStore({
      file: file,
      fileSearchStoreName: fileSearchStore.name,
      config: {
        displayName: displayName,
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
    return fileSearchStore.name;
  } catch (error) {
    throw new Error(error);
  }
};
