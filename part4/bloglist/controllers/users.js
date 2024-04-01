const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})
    response.status(200).send(users)
})

usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body
    if(!password) {
        response.status(400).json({error : 'Password is required!'})
    }
    if(password.length < 3) {
        response.status(400).json({error : 'Password must contain minimum 3 characters!'})
    }
    const passwordHash = bcrypt.hash(password, 10)
    const user = new User({username, name, passwordHash})
    const saved = await user.save(user)
    response.status(201).json(saved)
})

module.exports = usersRouter