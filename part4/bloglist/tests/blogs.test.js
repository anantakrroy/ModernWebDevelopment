const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('./../models/Blog')
const testUtils = require('./test_utils')

const app = require('./../app')

const api = supertest(app)

beforeEach(async() => {
    await Blog.deleteMany({})
    for(let blog of testUtils.testBlogsList) {
        await new Blog(blog).save()
    }
})

test('GET request to / returns all blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 2)
})

test('Each blog has id identifier and not _id', async() => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.every(blog => blog.id), true)
    assert.strictEqual(response.body.every(blog => blog._id), false)
})

test('Creates a new blog successfully', async()=> {
    const newBlog = {
        'title':'Exploring the native NodeJS test runner','author':'Alexander Godwin','url':'https://blog.logrocket.com/exploring-node-js-native-test-runner/','likes':5
    }

    const response = await api.post('/api/blogs')
        .send(newBlog)
        .expect('Content-Type',/application\/json/)
        .expect(201)
    const getResponse =  await api.get('/api/blogs')
    const blogsLength = getResponse.body.length
    assert.strictEqual(blogsLength, 3)
    const findSavedBlog = await Blog.findOne({title : 'Exploring the native NodeJS test runner'})
    assert(findSavedBlog)
})

test('Default likes set to 0', async() => {
    const blogWithMissingLikes = {
        'title':'Exploring the native NodeJS test runner','author':'Alexander Godwin',
        'url':'https://blog.logrocket.com/exploring-node-js-native-test-runner/'
    }
    const response = await api.post('/api/blogs')
        .send(blogWithMissingLikes)
        .expect('Content-Type', /application\/json/)
        .expect(201)
    assert.strictEqual(response.body.likes,0)
})

after(async() => {
    await mongoose.connection.close()
})