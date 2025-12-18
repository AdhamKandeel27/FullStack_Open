import express from "express";
import mongoose from "mongoose";
import { DATABASE_URL } from "./utils/config.js";
import logger from "./utils/logger.js";
import blogsRouter from "./controllers/BlogsController.js";

const app = express();

mongoose
  .connect(DATABASE_URL, { family: 4 })
  .then(() => {
    logger.info("CONNECTED TO DB SUCCESSFULLY");
  })
  .catch((err) => {
    logger.error(err.message);
  });

app.use(express.json());
app.use('/api/blogs', blogsRouter)

export default app;
