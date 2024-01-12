const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('dist'))

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

app.get("/", (request, response) => {
  response.send("<h1>Hello World </h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) response.json(note);
  else response.status(404).end();
});

app.put("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  const toggledImportance = request.body;
  response.json(toggledImportance);
  
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
    const nextId = maxId + 1;
    return nextId;
  };

  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "Content is missing !",
    });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };

  notes = notes.concat(note);
  response.json(note);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
