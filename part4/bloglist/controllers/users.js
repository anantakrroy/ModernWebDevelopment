const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.status(200).send(users)
})

usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body
    const passwordHash = bcrypt.hash(password, 10)
    const user = new User({username, name, passwordHash})
    const saved = await user.save(user)
    response.status(201).json(saved)
})

module.exports = usersRouter