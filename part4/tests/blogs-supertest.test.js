import supertest from "supertest";
import app from "../app.js";
import { test, describe, beforeEach, after } from "node:test";
import Blog from "../models/Blog.js";
import assert from "node:assert";
import mongoose from "mongoose";

const api = supertest(app);

const blogs = [
  {
    title: "Blog 1",
    author: "Adham Kandeel",
    url: "https://www.google.com",
    likes: 27,
  },
  {
    title: "Blog 2",
    author: "Hisham Kandeel",
    url: "https://www.google.com",
    likes: 1,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(blogs[0]);
  await blogObject.save();
  blogObject = new Blog(blogs[1]);
  await blogObject.save();
});

describe("Blogs", () => {
  test("Get al blogs", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, blogs.length);
  });

  test("unique identifier property is named id", async () => {
    const response = await api.get("/api/blogs").expect(200);

    response.body.forEach((blog) => {
      assert.ok(blog.id, "Blog should have an id property");
    });
  });

  test("Blog Added", async () => {
    const newBlog = {
      title: "Blog 3",
      author: "Ahemd Hisham",
      url: "https://www.google.com",
      likes: 21,
    };
    await api.post("/api/blogs").send(newBlog).expect(201);
    const response = await api.get("/api/blogs");
    const authors = response.body.map((r) => r.author);
    assert.strictEqual(response.body.length, blogs.length + 1);
    assert(authors.includes("Ahemd Hisham"));
  });

  test("if likes not set then likes is 0", async () => {
    const newBlog = {
      title: "Blog with no likes",
      author: "Ahemd Hisham",
      url: "https://www.google.com",
    };
    //check the post response straight away 3ahshan keda kedapsot betaga3 the JUST POSTED BLOG
    const postResponse = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    assert.strictEqual(postResponse.body.likes, 0);
  });
  test("if title missing we get 400 Bad req.", async () => {
    const newBlog = {
      title: "",
      author: "Youssef Hisham",
      url: "https://www.google.com",
      likes:123
    };
    const postResponse = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    assert.strictEqual(postResponse.body.error, "Missing fields");
  });

  test("if url missing we get 400 Bad req.", async () => {
    const newBlog = {
      title: "Not missing",
      author: "Youssef Hisham",
      likes:123
    };
    const postResponse = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    assert.strictEqual(postResponse.body.error, "Missing fields");
  });


});

after(async () => {
  await mongoose.connection.close();
});
