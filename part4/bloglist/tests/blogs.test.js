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

after(async() => {
    await mongoose.connection.close()
})