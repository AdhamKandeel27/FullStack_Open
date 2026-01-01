import { useState } from "react";

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [isViewed, setIsViewed] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  console.log(blog);
  return (
    <div style={blogStyle} className="blog">
      <p className="blog-title-author">
        {blog.title} {blog.author}
        <button
          style={{ display: "inline-block" }}
          type="button"
          onClick={() => {
            setIsViewed(!isViewed);
          }}
        >
          {isViewed ? "Hide Details" : "View Details"}
        </button>
      </p>
      <div className="blog-details" style={{ display: isViewed ? "block" : "none" }}>
        <div className="likes">
          likes: {blog.likes}
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div className="blog-url">{blog.url}</div>
        {blog.user.name}
      </div>
      <div className="delete-button">
        <button type="button" onClick={() => handleDelete(blog)}>Delete</button>
      </div>
    </div>
  );
};

export default Blog;
