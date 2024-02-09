require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Note = require('./models/note')

const app = express()

//  allow requests from all origin
app.use(cors())

// use for handling request bodies in requests
app.use(express.json())

// Serve static files in the same port as server
app.use(express.static('dist'))

// morgan logger
app.use(morgan('tiny'))

// Error handler
const errorHandler = (error, request, response, next) => {
  console.log(`Executing error handler .... ${error}`)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id ! ' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

//  GET all notes
app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => response.json(notes))
})

// GET note with specific id
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) response.json(note)
      else response.status(404).end()
    })
    .catch((error) => {
      next(error)
    })
})

//  POST a new note
app.post('/api/notes', (request, response, next) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing !' })
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
  note
    .save()
    .then((savedNote) => response.json(savedNote))
    .catch((error) => next(error))
})

// DELETE a note
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      console.log(result)
      if (result) {
        response.status(204).end()
      } else {
        response
          .status(404)
          .send({ message: 'Note not found, already deleted from DB !!' })
      }
    })
    .catch((error) => next(error))
})

//  UPDATE note
app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body
  const updatedNote = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, updatedNote, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updated) => {
      console.log(`Updated note : ${updated}`)
      updated
        ? response.status(200).json(updated)
        : response.status(404).json({ message: 'Note with id note found !!' })
    })
    .catch((error) => next(error))
})

// Middleware for unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).json({
    message: `Missing route : ${request.path} from the server !`,
  })
}

app.use(unknownEndpoint)

// error handling is the last loaded middleware
app.use(errorHandler)

const port = process.env.PORT || 3001
app.listen(port)
console.log(`Server running on port ${port} !`)
