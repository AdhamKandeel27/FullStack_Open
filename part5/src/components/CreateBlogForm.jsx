import React from "react";
import { useState } from "react";

function CreateBlogForm({ createBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = (e) => {
    e.preventDefault();

    createBlog({ title, author, url });
  };
  return (
    <>
      <div className="create-blog-form">
        <h2>Create New Blog</h2>
        <form onSubmit={handleCreateBlog}>
          <label>
            Title
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>
          <label>
            Author
            <input
              type="text"
              placeholder="author"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
          </label>
          <label>
            URL
            <input
              type="text"
              placeholder="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </label>
          <button type="submit">create</button>
        </form>
      </div>
    </>
  );
}

export default CreateBlogForm;
