import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import axios from "axios";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ message: null, type: null });

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
      showNotification(`A new blog ${blogData.title} by ${blogData.author} added`, "success");
    } catch (error) {
      showNotification("Failed to create blog", "error");
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

          <CreateBlogForm createBlog={createBlog} />

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
