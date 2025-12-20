import listHelper from "../utils/list_helper.js";
import { test, describe } from "node:test";
import assert from "node:assert";

describe("this is a trest collection", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
  });
});

describe("totalLikes", () => {
  test("empty list is 0", () => {
    const blogsPosts = [];
    assert.strictEqual(listHelper.totalLikes(blogsPosts), 0);
  });
  test("when list has only 1 blog equals the likes of that blog", () => {
    const blogsPosts = [{ likes: 20 }];
    assert.strictEqual(listHelper.totalLikes(blogsPosts), 20);
  });
  test("bigger list", () => {
    const blogsPosts = [{ likes: 20 }, { likes: 40 }, { likes: 100 }];
    assert.strictEqual(listHelper.totalLikes(blogsPosts), 160);
  });
});

describe('favoriteBlogs',()=>{
    test('empty list returns 0',()=>{
        const blogs =[]
        assert.strictEqual(listHelper.favoriteBlog(blogs),0)
    })
    test('testing max',()=>{
        const blogs =[{likes:10},{likes:1000},{likes:40},{likes:3}]
        assert.strictEqual(listHelper.favoriteBlog(blogs),1000)
    })
})

