const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')
const User = require('../models/user')
const {
  initialNotes,
  firstUserId,
  dummyUser,
  nonExistingId,
  notesInDb,
  usersInDb,
} = require('./test_helper')

const api = supertest(app)

let token

describe('when there are some initial notes saved', () => {
  beforeEach(async () => {
    await Note.deleteMany({})
    await Note.insertMany(initialNotes)
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash(dummyUser.password, 10)
    const user = new User({
      username: dummyUser.username,
      name: dummyUser.name,
      passwordHash: passwordHash,
    })
    await user.save()
    token = await api
      .post('/api/login')
      .send({ username: dummyUser.username, password: dummyUser.password })
    token = token.body.token
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/notes')
    assert.strictEqual(response.body.length, initialNotes.length)
  })

  test('All notes are returned', async () => {
    const response = await api.get('/api/notes')
    assert.strictEqual(response.body.length, initialNotes.length)
  })

  test('A specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map((e) => e.content)
    assert(contents.includes('HTML is easy'))
  })

  describe('viewing a specific note', () => {
    test('A specific note can be viewed', async () => {
      const allNotes = await notesInDb()
      const noteToView = allNotes[0]

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultNote.body, noteToView)
    })

    test('Fails with statuscode 404 if the note does not exist', async () => {
      const id = await nonExistingId()
      await api.get(`/api/notes/${id}`).expect(404)
    })

    test('Fails with statuscode 400 when id is invalid', async () => {
      const invalidId = 'dji792dskds'
      await api.get(`/api/notes/${invalidId}`).expect(400)
    })
  })

  describe('Addition of a new note', () => {
    test('a valid note can be added', async () => {
      const id = await firstUserId()
      console.log('User Id >>>> ', id)

      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
        userId: id,
      }

      const headers = {
        'Authorization' : `Bearer ${token}`
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .set(headers)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/notes')
      const contents = response.body.map((notes) => notes.content)
      assert.strictEqual(response.body.length, initialNotes.length + 1)
      assert(contents.includes('async/await simplifies making async calls'))
    })

    test('fails with status 400 if note is invalid', async () => {
      const invalidNote = {
        important: false,
      }

      await api.post('/api/notes').send(invalidNote).expect(400)

      const response = await api.get('/api/notes')
      assert.strictEqual(response.body.length, initialNotes.length)
    })
  })

  describe('Deletion of a note', () => {
    test('a note can be deleted', async () => {
      const allNotes = await notesInDb()
      const noteToDelete = allNotes[0]

      await api.delete(`/api/notes/${noteToDelete.id}`)

      const newNotes = await notesInDb()
      const contents = newNotes.map((note) => note.content)
      assert(!contents.includes(noteToDelete.content))
      assert.strictEqual(newNotes.length, allNotes.length - 1)
    })
  })
})

describe('user api testing --- when there is one user initially in the DB', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Note.deleteMany({})
    await Note.insertMany(initialNotes)
    const passwordHash = await bcrypt.hash(dummyUser.password, 10)
    const user = new User({
      username: dummyUser.username,
      name: dummyUser.name,
      passwordHash: passwordHash,
      notes: dummyUser.notes,
    })
    await user.save()
  })

  test('creation succeeds with fresh username', async () => {
    const users = await usersInDb()
    const id = await firstUserId()
    const newUser = {
      username: 'marypop',
      name: 'Mary Poppins',
      password: 'mary123',
      notes: [id],
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const updatedUsers = await usersInDb()
    assert.strictEqual(updatedUsers.length, users.length + 1)
    const usernames = updatedUsers.map((user) => user.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await usersInDb()
    const newUser = {
      username: 'rootyroot',
      password: 'sjfir',
      name: 'Sneaky Root',
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert(response.body.error.includes('expected `username` to be unique !'))
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  test('creation fails if the username validations fail', async () => {
    const usersAtStart = await usersInDb()
    // username minlength not satisfied
    const newUser = {
      username: 'rt',
      password: 'rt123',
      name: 'Rt Now',
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert(response.body.error.includes('User validation failed'))
  })
})

after(async () => {
  await mongoose.connection.close()
  console.log('finished the api testing suite ....')
})
