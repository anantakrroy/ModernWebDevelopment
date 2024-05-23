/* eslint-disable react/prop-types */
const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username :
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password :
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit" onSubmit={handleLogin}>Login</button>
    </form>
  )
}

export default LoginForm