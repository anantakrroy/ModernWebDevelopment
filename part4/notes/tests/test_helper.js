const Note = require('../models/note')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
]


// function to create a  DB object ID that does not belong to any note in the database
const nonExistingId = async() => {
  const newNote = new Note({ content : 'this will be deleted soon' })
  await newNote.save()
  await newNote.deleteOne()
  return newNote._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

module.exports = { initialNotes, nonExistingId, notesInDb }