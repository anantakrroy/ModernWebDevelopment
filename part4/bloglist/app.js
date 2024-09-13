const express = require('express')
require('express-async-errors')
const config = require('./utils/config')
const cors = require('cors')
require('express-async-errors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

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
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

if(process.env.NODE_ENV === 'test') {
    console.log('Testing in ... ', process.env.NODE_ENV)
    
    const resetRoute = require('./controllers/testing')
    app.use('/api/reset', resetRoute)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app