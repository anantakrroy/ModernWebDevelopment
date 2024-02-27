const { describe, test, after , beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')
const { initialNotes, nonExistingId, notesInDb } = require('./test_helper')

const api = supertest(app)


beforeEach(async() => {
  await Note.deleteMany({})
  let noteObj = new Note(initialNotes[0])
  await noteObj.save()
  noteObj = new Note(initialNotes[1])
  await noteObj.save()
})

describe('notes api testing', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two notes', async() => {
    const response =  await api.get('/api/notes')
    assert.strictEqual(response.body.length, initialNotes.length)
  })

  test('the first note is about HTML' , async() => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(e => e.content)
    assert(contents.includes('HTML is easy'))
  })

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

  test('note without content will not be added', async() => {
    const invalidNote = {
      important : false
    }

    await api.post('/api/notes')
      .send(invalidNote)
      .expect(400)

    const response = await api.get('/api/notes')
    assert.strictEqual(response.body.length, initialNotes.length)
  })

  after(async () => {
    await mongoose.connection.close()
    console.log('finished the api testing suite ....')
  })
})
