import express from "express";
import GeminiRouter from "./routers/features.routers.js";
import OpenAIRouter from "./routers/openaiFeatures.routers.js";
// import { uploadToStore } from "./middleware/uploadFile.middleware.js";

const app = express();

// middleware
app.use([express.json(), express.urlencoded({ extended: false })]);
// app.use(uploadToStore);

// routers
app.use("/", GeminiRouter);
app.use("/openai", OpenAIRouter);

// run the server
app.listen(process.env.PORT || 3000);
