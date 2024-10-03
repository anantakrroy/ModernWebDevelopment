import { React } from 'react'
import { createRoot } from 'react-dom/client'
import {createStore} from 'redux'
import noteReducer from './reducers/notereducer'
// import App from './App.jsx'
import './index.css'

const store = createStore(noteReducer)

const App = () => {
  const generateId = () => {
    return Math.random() * 10000
  }

  const addNote = (e) => {
    e.preventDefault()
    const content = e.target.newnote.value
    // reset the note field to empty string
    e.target.newnote.value = '' 
    store.dispatch({type: 'NEW_NOTE', payload: {
      content: content,
      important: false,
      id: generateId()
    }})    
  }

  const toggleImportance = (id) => {
    store.dispatch({type: 'TOGGLE_IMP', payload : {id}})
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input type='text' name='newnote' id='newnote'/>
        <button type='submit'>Create</button>
      </form>
      <ul>
        {store.getState().map(note => <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
        </li>)}
      </ul>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)