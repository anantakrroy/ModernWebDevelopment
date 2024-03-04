const { test, after , beforeEach , describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')
const { initialNotes, nonExistingId, notesInDb } = require('./test_helper')

const api = supertest(app)

describe('when there are some initial notes saved', () => {
  beforeEach(async() => {
    await Note.deleteMany({})
    await Note.insertMany(initialNotes)
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/notes')
    assert.strictEqual(response.body.length, initialNotes.length)
  })

  test('All notes are returned', async() => {
    const response =  await api.get('/api/notes')
    assert.strictEqual(response.body.length, initialNotes.length)
  })

  test('A specific note is within the returned notes' , async() => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(e => e.content)
    assert(contents.includes('HTML is easy'))
  })

  describe('viewing a specific note', () => {
    test('A specific note can be viewed', async() => {
      const allNotes = await notesInDb()
      const noteToView = allNotes[0]

      const resultNote = await api.get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultNote.body, noteToView)
    })

    test('Fails with statuscode 404 if the note does not exist', async() => {
      const id = await nonExistingId()
      await api
        .get(`/api/notes/${id}`)
        .expect(404)
    })

    test('Fails with statuscode 400 when id is invalid', async() => {
      const invalidId = 'dji792dskds'
      await api
        .get(`/api/notes/${invalidId}`)
        .expect(400)
    })
  })

  describe('Addition of a new note', () => {
    test('a valid note can be added', async() => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true
      }

      await api.post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/notes')
      const contents = response.body.map(notes => notes.content)
      assert.strictEqual(response.body.length, initialNotes.length + 1)
      assert(contents.includes('async/await simplifies making async calls'))
    })

    test('fails with status 400 if note is invalid', async() => {
      const invalidNote = {
        important : false
      }

      await api.post('/api/notes')
        .send(invalidNote)
        .expect(400)

      const response = await api.get('/api/notes')
      assert.strictEqual(response.body.length, initialNotes.length)
    })
  })

  describe('Deletion of a note', () => {
    test('a note can be deleted', async() => {
      const allNotes = await notesInDb()
      const noteToDelete = allNotes[0]

      await api.delete(`/api/notes/${noteToDelete.id}`)

      const newNotes = await notesInDb()
      const contents = newNotes.map(note => note.content)
      assert(!contents.includes(noteToDelete.content))
      assert.strictEqual(newNotes.length, allNotes.length - 1)
    })
  })

})

after(async () => {
  await mongoose.connection.close()
  console.log('finished the api testing suite ....')
})
