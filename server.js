import express from "express";
import GeminiRouter from "./routers/features.routers.js";

const app = express();
app.use([express.json(), express.urlencoded({ extended: false })]);
app.use("/", GeminiRouter);
app.listen(process.env.PORT || 3000);
