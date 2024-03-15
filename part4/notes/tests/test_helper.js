const Note = require('../models/note')
const User = require('../models/user')
const mongoose = require('mongoose')

const dummyUser = {
  username: 'rootyroot',
  name: 'Bohe Root',
  password: 'root123',
  notes: [new mongoose.Types.ObjectId()]
}

const usersInDb = async() => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const firstUserId = async() => {
  const user = await usersInDb()
  return user[0].id
}

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
    userId: firstUserId()
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
    userId: firstUserId()
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

module.exports = { initialNotes, firstUserId, dummyUser, nonExistingId, notesInDb, usersInDb }