const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response) => {
    try {
        const { username, password } = request.body
        const isUser = await User.findOne({ username })

        if (!isUser) {
            response.status(401).json({ error: `User "${username}" not found !` })
        } else {
            const isPasswordCorrect = await bcrypt.compare(
                password,
                isUser.passwordHash
            )
            if (isPasswordCorrect) {
                const user = {
                    username: isUser.username,
                    id: isUser._id,
                }
                const token = jwt.sign(user, process.env.SECRET)
                response
                    .status(200)
                    .json({ token, username: user.username, name: isUser.name, id: user.id })
            } else {
                response.status(401).json({ error: 'Invalid password !' })
            }
        }
    } catch (error) {
        console.log(`Login backend error >>> ${error.message}`)
    }
})

module.exports = loginRouter
