const express = require('express')
const config = require('./utils/config')
const cors = require('cors')
require('express-async-errors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

const app = express()
mongoose.set('strictQuery', false)

const MONGO_URI = config.MONGO_URI
mongoose
    .connect(MONGO_URI)
    .then(() => logger.info('Connected to DB ....'))
    .catch((error) => logger.error('Error connecting to DB ...', error))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app