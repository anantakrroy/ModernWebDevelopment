const express = require('express')
const config = require('./utils/config')
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const Blog = require('./models/Blog')

const app = express()
mongoose.set('strictQuery', false)

const MONGO_URI = config.MONGO_URI
mongoose
    .connect(MONGO_URI)
    .then(() => logger.info('Connected to DB ....'))
    .catch((error) => logger.error('Error connecting to DB ...', error))

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
    Blog.find({}).then((blogs) => response.json(blogs))
})

app.post('/api/blogs', (request, response) => {
    const newBlog = new Blog(request.body)
    newBlog.save().then((result) => response.status(201).json(result))
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app