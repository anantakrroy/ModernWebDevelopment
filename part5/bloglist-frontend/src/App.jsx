import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("form values >> ", username, password);
    try {
      const user = await loginService.login({username, password})
      console.log(`Token returned ???? ${JSON.stringify(user)}`);
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log("error logging in .... ", error);
    }
  }

  return (
    <div>
      {!user ? (
        <div>
          <h2>Log in to App</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username: </label>
              <input type="text" name="Username" id="username" value={username} onChange={({target}) => setUsername(target.value)}/>
            </div>
            <div>
              <label htmlFor="password">Password : </label>
              <input type="password" id="password" name="Password" value={password} onChange={({target}) => setPassword(target.value)} />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <>
          <h2>Blogs</h2>
          <h4>User : {user.data.name} is logged in....</h4>
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
