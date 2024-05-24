import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
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
  const [alert,setAlert] = useState({});
  const [showForm, setShowForm] = useState(false);

  //  Fetch all the notes when app loads
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.reverse()));
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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      // set token in local storage
      setToken(user.data.token);
      setUsername("");
      setPassword("");
      setAlert({
        "message" : `${user.data.name} logged in successfully...`,
        "type" : "success"
      });
      setTimeout(() => {
        setAlert({})
      }, 5000);
    } catch (error) {
      setAlert({
        "message" : `failed to log in ... ${error.response.data.error}`,
        "type" : "error"
      })
      setTimeout(() => {
        setAlert({})
      }, 5000)
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedInUser");
      setAlert({
        "message" : `${user.data.name} logged out...`,
        "type":"success"
      });
      setUser("");
      setTimeout(() => {
        setAlert({});
      }, 5000);
    } catch (error) {
      setAlert({
        "message" : error.message,
        "type" : "error"
      });
      setTimeout(() => {
        setAlert({})
      },5000)
    }
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    setShowForm(!showForm);
    try {
      const newBlog = { title, author, url };
      const response = await blogService.create(newBlog, token);
      setBlogs([response, ...blogs])
      setAlert({
        "message" : `Created new blog : ${newBlog.title} by ${newBlog.author}`,
        "type" : "success"
      })
      setTitle("");
      setAuthor("");
      setUrl("");
      setTimeout(() => {
        setAlert({})
      }, 5000)
    } catch (error) {
      setAlert({
        "message" : error.response.data.error,
        "type" : "error"
      })
      setTimeout(() => {
        setAlert({})
      }, 5000)
    }
  };

  return (
    <div>
      {alert.message ? <Notification type={alert.type} message={alert.message}/> : <></>}
      {!user ? (
        <div>
          <h2>Log in to App</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="Username"
                id="username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password : </label>
              <input
                type="password"
                id="password"
                name="Password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
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
            <button onClick={() => {setShowForm(!showForm)}}>Create New Blog</button>
            {showForm ? <form onSubmit={handleCreateBlog}>
              <label htmlFor="title">Title : </label>
              <input
                type="text"
                name="Title"
                id="title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
              <label htmlFor="author">Author : </label>
              <input
                type="text"
                name="Author"
                id="author"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
              <label htmlFor=""></label>
              <label htmlFor="url">Url : </label>
              <input
                type="url"
                name="Url"
                id="url"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
              <button type="submit">Create</button>
              <button onClick={() => setShowForm(!showForm)}>Cancel</button>
            </form> : <></>}
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
