import { useState } from 'react'

const LoginForm = ({ username, password, handleUsernameChange, handlePasswordChange, handleLogin }) => {
  return (
    <div>
      <h2>Log in to App</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="Username"
            id="username"
            data-testid='username'
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            id="password"
            data-testid="password"
            name="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" onSubmit={handleLogin}>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
