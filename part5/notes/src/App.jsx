import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const hook = () => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }

  useEffect(hook, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  // Problem statement : We need to hide the note form when a new note button is created upon clicking the button

  const noteFormRef = useRef()

  const noteForm = () => (
    <Togglable ref={noteFormRef} buttonLabel="Login">
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true)

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService.create(noteObject).then((newNote) => {
      setNotes(notes.concat(newNote))
      setNewNote('')
    })
  }

  const toggleImportance = (id) => {
    // console.log(`Toggle importance of note with id : ${id}`);
    const note = notes.find((note) => note.id === id)
    // change the note important property ; below creates a shallow copy of the old note object.
    const changedNote = { ...note, important: !note.important }
    // make a PUT request to change the notes
    noteService
      .update(id, changedNote)
      .then((newNote) => {
        setNotes(notes.map((note) => (note.id === id ? newNote : note)))
        setNotification({
          type: 'success',
          message: `Note : ${note.content} updated !`,
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch((error) => {
        setNotification({
          type: 'error',
          message: `Note : ${note.content} was already deleted from the server !`,
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setNotes(notes.filter((note) => note.id !== id))
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log(
    //   `Logging in with username : ${username} and password : ${password}`
    // );
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      // console.log(`User >>> ${user}`);
      noteService.setToken(user.token)
      setNotification({
        type: 'success',
        message: `Login successful for ${user.name}`,
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Wrong credentials !',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification notify={notification} />
      {/* render login form if no user logged in */}
      {/* render note form if user is logged in */}
      {user === null ? (
        <Togglable buttonLabel="Login">
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </Togglable>
      ) : (
        <div>
          <p>
            User : <em>{user.name}</em> logged in ...
          </p>
          {noteForm()}
        </div>
      )}
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? 'Important' : 'All'}
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
        <p style={{ fontColor: 'red' }}>{'No notes found to render !'}</p>
      )}

      <Footer />
    </div>
  )
}

export default App
