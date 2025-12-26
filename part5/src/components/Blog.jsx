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
    <div style={blogStyle}>
      <p>
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
      <div style={{ display: isViewed ? "block" : "none" }}>
        <div className="likes">
          likes: {blog.likes}
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        {blog.user.name}
      </div>
      <div className="delete-button">
        <button type="button" onClick={() => handleDelete(blog)}>Delete</button>
      </div>
    </div>
  );
};

export default Blog;
