import { useState, useEffect } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
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
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const addNote = (noteObject) => {
    noteService.create(noteObject).then((newNote) => {
      setNotes(notes.concat(newNote));
      setNewNote("");
    });
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
      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));
      noteService.setToken(user.token);
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

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errMessage} />
      {/* render login form if no user logged in */}
      {/* render note form if user is logged in */}
      {user === null ? (
        <Togglable buttonLabel="Login">
            <LoginForm username={username} password={password} handleLogin={handleLogin} handleUsernameChange={({target}) => setUsername(target.value)} handlePasswordChange={({target}) => setPassword(target.value)}/>
        </Togglable>
      ) : (
        <div>
          <p>
            User : <em>{user.name}</em> logged in ...
          </p>
          <Togglable buttonLabel="new note">
            <NoteForm createNote={addNote}/>
          </Togglable>
        </div>
      )}
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
