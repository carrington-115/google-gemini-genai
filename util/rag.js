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
  // uploading if file does not exists
  try {
    const newFile = await ragModel.files.upload({
      file: file,
      config: {
        name: displayName,
      },
    });

    // })
    const fileSearchStore = await createfileSearchStore(displayName);
    let uploadFile = await ragModel.fileSearchStores.importFile({
      fileSearchStoreName: fileSearchStore.name,
      fileName: newFile.name,
    });

    if (!uploadFile) {
      const error = new Error();
      error.message = "Some error occurred while uploading the file";
      throw error;
    }

    // control when upload delay
    if (!uploadFile.done) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      uploadFile = await ragModel.operations.get({ operation: uploadFile });
    }
    return fileSearchStore.name;
  } catch (error) {
    console.error(error);
  }
};
