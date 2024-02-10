const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const Phonebook = require('./models/phonebook');

const app = express();

app.use(cors());
app.use(express.json());

// serve static files
app.use(express.static('dist'));

// Log all requests to console in 'tiny' format
app.use(morgan('tiny'));

// Log POST requests to console in custom format
morgan.token('request-body', function (req) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :request-body'
  )
);

// Error handler
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    response.status(400).json({ message: error.message });
  }
  if(error.name === 'ValidationError') {
    console.log(`Validation Error handling : ${error.message}`);
    response.status(400).json({ error : error.message });
  }
  next();
};

// GET all entries
app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then((entries) => {
    response.json(entries);
  });
});

// App info to get phonebook entries count
app.get('/api/info', (request, response) => {
  const date = new Date();
  response.set({
    'Content-Type': 'text/html',
    Date: date.toString(),
  });
  Phonebook.find({}).then((result) => {
    console.log(result);
    response.send(
      `<p>Phonebook has info for <strong>${
        result.length
      } people</strong></p><p>${response.get('Date')}<p/>`
    );
  });
});

// GET specific person from phonebook
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  Phonebook.findById(id)
    .then((doc) => response.status(200).json(doc))
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

// DELETE specific entry
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  Phonebook.findByIdAndDelete(id)
    .then((deletedEntry) => {
      // console.log(`Deleted phoneboon entry : ${deletedEntry}`);
      if (deletedEntry) {
        response.status(204).end();
      } else {
        response.status(404).json({
          message: `Error deleting user id : ${id} ! Does not exist !`,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

// ADD an entry
app.post('/api/persons', (request, response, next) => {
  const body = request.body;
  const newPerson = new Phonebook({
    name: body.name,
    number: body.number,
  });
  newPerson
    .save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((error) => {
      // console.log(`Error caught backend >>> ${error}`);
      next(error);
    });
});

// Update an entry
app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  const updatedPerson = {
    name: request.body.name,
    number: request.body.number,
  };
  Phonebook.findByIdAndUpdate(id, updatedPerson, { new: true , runValidators: true, context: 'query' })
    .then((updatedDoc) => {
      // console.log(`Document to update >> ${updatedDoc}`);
      response
        .status(200)
        .json({
          message: `Updated details of ${updatedDoc.name} successfully !`,
        });
    })
    .catch((error) => {
      console.log(`Backend Caught error updating entry >>> ${error}`);
      next(error);
    });
});

// handle non existent routes
const unknownEndpoint = (request, response) => {
  response.status(404).json({ message: 'Not found on server !' });
};

app.use(unknownEndpoint);

// use error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT} ...`);
});
