const { test, expect, beforeEach, describe } = require("@playwright/test");
const { request } = require("http");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    const resetRes = await request.post("/api/testing/reset");
    const createRes = await request.post("/api/users", {
      data: {
        name: "Adham Testing",
        username: "adhamtesting",
        password: "adhamtest",
      },
    });
    await page.goto("/");
  });
  test("Login form is shown", async ({ page }) => {
    const LoginText = await page.getByText("Login form");
    await expect(LoginText).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByLabel("username").fill("adhamtesting");
      await page.getByLabel("password").fill("adhamtest");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("Login successful")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByLabel("username").fill("adhamtesting");
      await page.getByLabel("password").fill("WRONGPASSWORD");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("Wrong username or password")).toBeVisible();
      // ...
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page, request }) => {
      await request.post("/api/testing/reset");
      await request.post("/api/users", {
        data: {
          name: "Adham Testing",
          username: "adhamtesting",
          password: "adhamtest",
        },
      });
      await page.goto("/");
      await page.getByLabel("username").fill("adhamtesting");
      await page.getByLabel("password").fill("adhamtest");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("Login successful")).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "Create new blog" }).click();
      await expect(
        page.getByRole("heading", { name: /Create New Blog/i })
      ).toBeVisible();      await page.getByLabel("Title").fill("Test Blog 1");
      await page.getByLabel("Author").fill("Test Author 1");
      await page.getByLabel("URL").fill("Test URL 1");
      await page.getByRole("button", { name: "create" }).click();
      await expect(page.getByText(`A new blog Test Blog 1 by Test Author 1 added`)).toBeVisible();
      await expect(page.getByText(`Test Blog 1 Test Author 1`)).toBeVisible();

    });
  });
});
