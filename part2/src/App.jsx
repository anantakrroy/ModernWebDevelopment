import { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      id: notes.length + 1,
      important: Math.random() < 0.5,
    };
    setNotes([...notes, noteObject]);
    setNewNote("a new note...");
  };

  const handleInputChange = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>Show {showAll ? "Important" : "All"}</button>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleInputChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;
