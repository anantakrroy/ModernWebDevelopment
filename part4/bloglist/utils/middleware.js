const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info(`Method : ${request.method}`)
    logger.info(`Path : ${request.path}`)
    logger.info(`Body : ${JSON.stringify(request.body)}`)
    logger.info('---')
    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.headers.authorization
    if(authorization && authorization.startsWith('Bearer ')) {
        const token =  authorization.replace('Bearer ','')
        request.token = token
        next()
    } else {
        next()
    }
}

const unknownEndpoint = (request, response) => {
    response.status(404).json({error : 'Not found ! '})
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if(error.name === 'CastError') {
        response.status(400).json({error : 'Malformatted id !'})
    } else if (error.name === 'ValidationError') {
        response.status(400).json({error : error.message})
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
        response.status(400).json({error : 'Username already exists !'})
    } else if (error.name === 'JsonWebTokenError') {
        response.status(401).json({error : error.message})
    }
    next(error)
}

module.exports = {requestLogger, tokenExtractor, unknownEndpoint, errorHandler}
