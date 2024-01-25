require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Note = require("./models/note");


const app = express();

app.use(cors());
// use for handling request bodies in requests
app.use(express.json());
app.use(morgan("tiny"));

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const password = process.argv[2];

//  GET all notes
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => response.json(notes));
});

//  POST a new note
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if(body.content === undefined){
    return response.status(400).json({error: 'content missing !'})
  }
  const note = new Note({
    content: body.content,
    important: body.important || false
  })
  note.save().then(savedNote => response.json(savedNote));
})

const port = process.env.PORT;
app.listen(port);
console.log(`Server running on port ${port} !`);
