/* -------------------------------------Tests Endpoints-------------------------------------------- */
import express from "express";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

const testsRouter = express.Router();

testsRouter.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});  

export default testsRouter;
