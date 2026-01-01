import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs");
  res.status(200).json(users);
});

usersRouter.post("/", async (req, res) => {
  const body = req.body;
  //destructure the body object into const {username,passwordHash,name} = req.body;
  if (!body.username || !body.password) {
    res.status(400).json({ error: "Invalid Credentials" });
    return;
  }
  if (body.username.length < 3 || body.password.length < 3) {
    res.status(400).json({ error: "Invalid Credentials length" });
    return;
  }
  const saltRoundes = 10;
  const hashedPassword = await bcrypt.hash(body.password, saltRoundes);

  const user = new User({
    username: body.username,
    passwordHash: hashedPassword,
    name: body.name,
  });

  const userAdded = await user.save();
  res.status(201).json(userAdded);
});

export default usersRouter;
