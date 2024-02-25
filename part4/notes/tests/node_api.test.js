const { describe, test, after , beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')

const api = supertest(app)

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

  after(async () => {
    await mongoose.connection.close()
    console.log('finished the api testing suite ....')
  })
})
