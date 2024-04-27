import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import noteService from "./services/notes";
import loginService from "./services/login";

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const hook = () => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  };

  useEffect(hook, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  },[])

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
      console.log(`response from backend ${JSON.stringify(newNote)}`);
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

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(
      `Logging in with username : ${username} and password : ${password}`
    );
    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log(`User >>> ${JSON.stringify(user)}`);
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrMessage("Wrong credentials !");
      setTimeout(() => {
        setErrMessage(null);
      }, 5000);
    }
  };

  // Login form
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username :{" "}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password :{" "}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

  // Note form
  const noteForm = () => (

    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleInputChange} />
      <button type="submit">Save</button>
    </form>
  );

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errMessage} />
      {/* render login form if no user logged in */}
      {/* render note form if user is logged in */}
      {user === null ? loginForm() 
      : <div>
          <p>User : <em>{user.name}</em> logged in ...</p>
          {noteForm()}
        </div>}
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? "Important" : "All"}
      </button>
      {notes ? (
        <ul>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportance(note.id)}
            />
          ))}
        </ul>
      ) : (
        <p style={{ fontColor: "red" }}>{"No notes found to render !"}</p>
      )}

      <Footer />
    </div>
  );
};

export default App;
