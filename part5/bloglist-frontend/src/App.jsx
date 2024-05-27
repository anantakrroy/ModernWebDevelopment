import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [alert, setAlert] = useState({});
  const [showForm, setShowForm] = useState(false);

  //  Fetch all the blogs when app loads
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.reverse()))
      .catch((err) => {
        setAlert({
          type: "error",
          message: `Error fetching blogs ... ${err.message}`,
        });
        setTimeout(() => setAlert({}), 5000)
      });
  }, []);

  // check if local storage contains valid user
  useEffect(() => {
    const userInStorage = window.localStorage.getItem("loggedInUser");
    if (userInStorage) {
      const user = JSON.parse(userInStorage);
      setUser(user);
      setToken(user.data.token);
    }
  }, []);

  // reference to blog form
  const ref = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      if (user) {
        setUser(user);
        window.localStorage.setItem("loggedInUser", JSON.stringify(user));
        // set token in local storage
        setToken(user.data.token);
        setUsername("");
        setPassword("");
        setAlert({
          message: `${user.data.name} logged in successfully...`,
          type: "success",
        });
        setTimeout(() => {
          setAlert({});
        }, 5000);
      }
    } catch (error) {
      setAlert({
        message: `failed to log in ... ${error.response.data.error}`,
        type: "error",
      });
      setTimeout(() => {
        setAlert({});
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedInUser");
      setAlert({
        message: `${user.data.name} logged out...`,
        type: "success",
      });
      setUser("");
      setTimeout(() => {
        setAlert({});
      }, 5000);
    } catch (error) {
      setAlert({
        message: error.message,
        type: "error",
      });
      setTimeout(() => {
        setAlert({});
      }, 5000);
    }
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    setShowForm(!showForm);
    ref.current.toggleVisibility();
    try {
      const newBlog = { title, author, url };
      const response = await blogService.create(newBlog, token);
      setBlogs([response, ...blogs]);
      setAlert({
        message: `Created new blog : ${newBlog.title} by ${newBlog.author}`,
        type: "success",
      });
      setTitle("");
      setAuthor("");
      setUrl("");
      setTimeout(() => {
        setAlert({});
      }, 5000);
    } catch (error) {
      setAlert({
        message: error.response.data.error,
        type: "error",
      });
      setTimeout(() => {
        setAlert({});
      }, 5000);
    }
  };

  const handleAuthor = (e) => setAuthor(e.target.value);
  const handleTitle = (e) => setTitle(e.target.value);
  const handleUrl = (e) => setUrl(e.target.value);

  return (
    <div>
      {alert.message ? (
        <Notification type={alert.type} message={alert.message} />
      ) : (
        <></>
      )}
      {!user ? (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      ) : (
        <>
          <h2>Blogs</h2>
          <div>
            <h4>User : {user.data.name} is logged in....</h4>
            <button type="submit" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div>
            <Togglable buttonLabel="Create Blog" ref={ref}>
              <BlogForm
                title={title}
                author={author}
                url={url}
                handleTitle={handleTitle}
                handleAuthor={handleAuthor}
                handleUrl={handleUrl}
                handleCreateBlog={handleCreateBlog}
              />
            </Togglable>
          </div>
          <ul>
            {blogs.map((blog) => (
              <li key={blog.id}>
                <Blog blog={blog} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
