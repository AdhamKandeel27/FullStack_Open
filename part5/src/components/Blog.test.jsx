import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("renders blog title and author by default", () => {
  const blog = {
    title: "Test Blog Title",
    author: "Test Author",
    url: "https://example.com",
    likes: 5,
    user: {
      name: "Test User",
    },
  };

  const handleLike = () => {};
  const handleDelete = () => {};

  render(
    <Blog blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
  );

  // Check that title and author are visible (they're in the same text node)
  const titleAuthorElement = screen.getByText(/Test Blog Title.*Test Author/);
  expect(titleAuthorElement).toBeVisible();
});

test("does not render blog URL or number of likes by default", () => {
  const blog = {
    title: "Test Blog Title",
    author: "Test Author",
    url: "https://example.com",
    likes: 5,
    user: {
      name: "Test User",
    },
  };

  const handleLike = () => {};
  const handleDelete = () => {};

  render(
    <Blog blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
  );

  // Check that URL is not visible (queryByText returns null if not found)
  const urlElement = screen.queryByText("https://example.com");
  expect(urlElement).not.toBeVisible();

  // Check that likes count is not visible
  const likesElement = screen.queryByText(/likes: 5/i);
  expect(likesElement).not.toBeVisible();
});

test("Only show url and likes when view button is clicked", async () => {
  const user = userEvent.setup();
  const blog = {
    title: "Test Blog Title",
    author: "Test Author",
    url: "https://example.com",
    likes: 5,
    user: {
      name: "Test User",
    },
  };
  const handleLike = () => {};
  const handleDelete = () => {};

  render(
    <Blog blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
  );

  // Initially, URL and likes should not be visible
  const urlElementBefore = screen.queryByText("https://example.com");
  const likesElementBefore = screen.queryByText(/likes: 5/i);
  expect(urlElementBefore).not.toBeVisible();
  expect(likesElementBefore).not.toBeVisible();

  // Click the view button
  const viewButton = screen.getByRole("button", { name: /View Details/i });
  await user.click(viewButton);

  // After clicking, URL and likes should be visible
  const urlElementAfter = screen.getByText("https://example.com");
  const likesElementAfter = screen.getByText(/likes: 5/i);
  expect(urlElementAfter).toBeVisible();
  expect(likesElementAfter).toBeVisible();
});
