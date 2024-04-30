import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  //  Fetch all the notes when app loads
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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
    } catch (error) {
      console.log("error logging in .... ", error);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedInUser')
    setUser('')
  }

  return (
    <div>
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
            <button type="submit" onClick={handleLogout}>Logout</button>
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
