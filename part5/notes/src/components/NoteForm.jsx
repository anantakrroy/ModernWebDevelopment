import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true
    })
    setNewNote('')
  }

  return (
    <div className='formDiv'>
      <form onSubmit={addNote}>
        <input data-testid='newnote' value={newNote} onChange={event => setNewNote(event.target.value)} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
export default NoteForm
