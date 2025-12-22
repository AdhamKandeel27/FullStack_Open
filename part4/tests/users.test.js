import supertest from "supertest";
import app from "../app.js";
import User from "../models/User.js";
import { test, describe, beforeEach, after } from "node:test";
import mongoose from "mongoose";
import assert from "node:assert";

const api = supertest(app);

const users = [
  {
    name: "Alice Example",
    username: "alice123",
    passwordHash: "hashedpassword1",
  },
  {
    name: "Bob Sample",
    username: "bob456",
    passwordHash: "hashedpassword2",
  },
  {
    name: "Charlie Test",
    username: "charlie789",
    passwordHash: "hashedpassword3",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  let user = new User(users[0]);
  await user.save();
  user = new User(users[1]);
  await user.save();
  user = new User(users[2]);
  await user.save();
});

describe("Users Suite", () => {
  test("Get all users", async () => {
    const response = await api.get("/api/users").expect(200);
    const names = response.body.map((user) => user.name);
    assert(names.includes("Charlie Test"));
    assert.strictEqual(response.body.length, users.length);
  });

  test("Create a new User", async () => {
    const newUser = {
      name: "Adham Test",
      username: "adham123",
      password: "password1",
    };
    const postResponse = await api.post("/api/users").send(newUser).expect(201);

    assert.strictEqual(postResponse.body.username, newUser.username);
    assert.strictEqual(postResponse.body.name, newUser.name);

    const getResponse = await api.get("/api/users").expect(200);
    const names = getResponse.body.map((user) => user.name);
    assert.strictEqual(getResponse.body.length, users.length + 1);
    assert(names.includes("Adham Test"));
  });
  //need to test that validations work
});

after(async () => {
  await mongoose.connection.close();
});
