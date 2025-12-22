import express from "express";
import Blog from "../models/Blog.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const blogsRouter = express.Router();

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user");
  res.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request),process.env.JWT_SECRET);
  if (!decodedToken) {
    return response.status(401).json({ error: "invalid token" });
  }

  //const user = await User.findById(request.body.userId); ehna msh 3ayzeen el id el fel req khalas 3ayzeen el verified mn el token
  const user = await User.findById(decodedToken.id);

  if (!user) {
    return response.status(400).json({ error: "userId missing or not valid" });
  }
  if (
    request.body.title === "" ||
    request.body.url === "" ||
    !request.body.url ||
    !request.body.title
  ) {
    response.status(400).json({ error: "Missing fields" });
    return;
  }
  const blog = new Blog({ ...request.body, user: user._id });
  const newBlog = await blog.save();
  user.blogs = user.blogs.concat(newBlog._id);
  await user.save();
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
