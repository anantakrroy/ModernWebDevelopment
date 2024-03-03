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

after(async() => {
    await mongoose.connection.close()
})