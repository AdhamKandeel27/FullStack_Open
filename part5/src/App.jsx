import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import axios from "axios";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useRef } from "react";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });
  const createBlogFormRef = useRef(); //create the remote , point at child

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const UserLoggedIn = window.localStorage.getItem("loggedInUser");
    if (UserLoggedIn) {
      const user = JSON.parse(UserLoggedIn);
      setUser(user);
    }
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
    showNotification("Logged out successfully", "success");
  };

  const handleLogin = async (event, username, password) => {
    event.preventDefault();
    try {
      const credentials = { username, password };
      const { data: loggedInUser } = await axios.post(
        "/api/login",
        credentials
      );
      window.localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      showNotification("Login successful", "success");
    } catch (error) {
      showNotification("Wrong username or password", "error");
    }
  };

  const createBlog = async (blogData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const response = await axios.post("/api/blogs", blogData, config);
      setBlogs([...blogs, response.data]);
      showNotification(
        `A new blog ${blogData.title} by ${blogData.author} added`,
        "success"
      );
      createBlogFormRef.current.toggleVisibility(); //use the funciton that controllers the current child
    } catch (error) {
      showNotification("Failed to create blog", "error");
    }
  };

  const handleLike = async (blog) => {
    try {
      // Prepare the blog object with all required fields for PUT request
      // The backend expects: user (ID), likes (incremented), author, title, url
      const updatedBlog = {
        user: blog.user.id || blog.user._id, // Use id if available, otherwise _id
        likes: blog.likes + 1, // Increment likes
        author: blog.author,
        title: blog.title,
        url: blog.url,
      };

      const response = await blogService.update(blog.id, updatedBlog);

      // Update the blogs state with the updated blog
      setBlogs(blogs.map((b) => (b.id === blog.id ? response : b)));
    } catch (error) {
      showNotification("Failed to update blog", "error");
    }
  };
  const handleDelete = async (blog) => {
    // Show confirmation dialog FIRST, before making any API call
    const confirmed = window.confirm(
      `Are you sure you want to delete "${blog.title}" by ${blog.author}?`
    );
    
    // Only proceed if user confirmed
    if (!confirmed) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      await blogService.deleteBlog(blog.id, config);
      // Remove the blog from state only after successful deletion
      setBlogs(blogs.filter((b) => b.id !== blog.id));
      showNotification(`Blog "${blog.title}" deleted successfully`, "success");
    } catch (error) {
      showNotification("Failed to delete blog", "error");
    }
  };

  return (
    <>
      <Notification type={notification.type} message={notification.message} />
      {!user && <LoginForm handleLogin={handleLogin} />}
      {user && (
        <div>
          <h2>blogs</h2>
          <h4>
            {`${user.name} is logged in`}{" "}
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </h4>

          <Togglable ref={createBlogFormRef} buttonLabel={"Create new blog"}>
            <CreateBlogForm createBlog={createBlog} />
          </Togglable>

          {[...blogs] // badal mat3ml a new array fe avr gedid  this creats a new array copying all the prev data to new array
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleDelete={handleDelete}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default App;
