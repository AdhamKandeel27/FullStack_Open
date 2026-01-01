import express from "express";
import mongoose from "mongoose";
import { DATABASE_URL } from "./utils/config.js";
import logger from "./utils/logger.js";
import blogsRouter from "./controllers/BlogsController.js";
import usersRouter from "./controllers/UserController.js";
import loginRouter from "./controllers/LoginController.js";
import "dotenv/config";
import testsRouter from "./controllers/TestingController.js";

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
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testsRouter);
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "Invalid Id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  } else if (error.name === "MongoServerError" && error.code === 11000) {
    return res.status(400).send({ error: "username must be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "token invalid" });
  }

  next(error);
};

app.use(errorHandler);

export default app;
