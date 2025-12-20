import express from "express";
import Blog from "../models/Blog.js";

const blogsRouter = express.Router();

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
    if (request.body.title==="" ||request.body.url===""||!request.body.url||!request.body.title) {
        response.status(400).json({error:"Missing fields"})
        return;
    }
  const blog = new Blog(request.body);
  const newBlog = await blog.save();
  response.status(201).json(newBlog);
});

export default blogsRouter;
