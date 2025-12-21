import express from "express";
import Blog from "../models/Blog.js";

const blogsRouter = express.Router();

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  if (
    request.body.title === "" ||
    request.body.url === "" ||
    !request.body.url ||
    !request.body.title
  ) {
    response.status(400).json({ error: "Missing fields" });
    return;
  }
  const blog = new Blog(request.body);
  const newBlog = await blog.save();
  response.status(201).json(newBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const deletedBlog = await Blog.findByIdAndDelete(id);
  if (!deletedBlog) {
    response.status(400).json({ error: "something went wrong" });
    return;
  }
  response.status(200).send(deletedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  let duplicateBlog = await Blog.findById(request.params.id);
  if (!duplicateBlog) {
    response.status(404).json({ error: "Blog Not found" });
    return;
  }
  duplicateBlog.likes = body.likes;
  const updatedNote = await duplicateBlog.save();
  response.send(updatedNote);
});

export default blogsRouter;
