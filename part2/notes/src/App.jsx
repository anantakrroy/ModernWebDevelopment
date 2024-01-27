import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import noteService from "./services/notes";

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errMessage, setErrMessage] = useState(null);

  const hook = () => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  };

  useEffect(hook, []);

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService.create(noteObject).then((newNote) => {
      setNotes(notes.concat(newNote));
      setNewNote("");
    });
  };

  const handleInputChange = (event) => {
    setNewNote(event.target.value);
  };

  const toggleImportance = (id) => {
    // console.log(`Toggle importance of note with id : ${id}`);
    const note = notes.find((note) => note.id === id);
    // change the note important property ; below creates a shallow copy of the old note object.
    const changedNote = { ...note, important: !note.important };
    // make a PUT request to change the notes
    noteService
      .update(id, changedNote)
      .then((newNote) => {
        setNotes(notes.map((note) => (note.id === id ? newNote : note)));
      })
      .catch((error) => {
        setErrMessage(
          `Note : ${note.content} was already deleted from the server !`
        );
        setTimeout(() => {
          setErrMessage(null);
        }, 5000);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errMessage} />
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? "Important" : "All"}
      </button>
      {notes ? <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul> : <p style={{fontColor: 'red'}}>{"No notes found to render !"}</p> }
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleInputChange} />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
