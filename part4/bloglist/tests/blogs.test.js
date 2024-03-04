const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('./../models/Blog')
const testUtils = require('./test_utils')

const app = require('./../app')
const { request } = require('node:http')

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
    const response = await api.post('/api/blogs')
        .send(testUtils.newBlog)
        .expect('Content-Type',/application\/json/)
        .expect(201)
    const getResponse =  await api.get('/api/blogs')
    const blogsLength = getResponse.body.length
    assert.strictEqual(blogsLength, 3)
    const findSavedBlog = await Blog.findOne({title : 'Exploring the native NodeJS test runner'})
    assert(findSavedBlog)
})

test('Default likes set to 0', async() => {
    
    const response = await api.post('/api/blogs')
        .send(testUtils.blogWithMissingLikes)
        .expect('Content-Type', /application\/json/)
        .expect(201)
    assert.strictEqual(response.body.likes,0)
})

test('Missing title or url throws 400 status', async() => {
    await api
        .post('/api/blogs')
        .send(testUtils.blogWithMissingTitle)
        .expect(400)

    await api
        .post('/api/blogs')
        .send(testUtils.blogWithMissingUrl)
        .expect(400)

    await api
        .post('/api/blogs')
        .send(testUtils.blogWithMissingTitleAndUrl)
        .expect(400)
})

after(async() => {
    await mongoose.connection.close()
})