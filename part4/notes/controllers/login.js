const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()

loginRouter.post('/', async(request, response) => {
  const { username, password } = request.body
  //   find the user
  const user = await User.findOne({ username })
  //   check if correct password supplied if user is present
  const isPasswordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  //   throw a 401 error if password is incorrect or user is not found
  if(!(user && isPasswordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  //   generate token for user found
  const userForToken = {
    username: user.username,
    id : user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  //   send response body with the token inside it
  response.status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter