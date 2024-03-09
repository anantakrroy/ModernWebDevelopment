const Note = require('../models/note')
const User = require('../models/user')

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

const initialUsers = async () => {
  const users = await User.find({})
  return users
}

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

const usersInDb = async() => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { initialNotes, initialUsers, nonExistingId, notesInDb, usersInDb }