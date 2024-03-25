const {test, after, beforeEach, describe} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('./../models/Blog')
const testUtils = require('./test_utils')

const app = require('./../app')

const api = supertest(app)


describe('Blog list test suite', () => {
    beforeEach(async() => {
        await Blog.deleteMany({})
        for(let blog of testUtils.testBlogsList) {
            await new Blog(blog).save()
        }
    })

    describe('Fetch blogs', () => {
        test('GET request to / returns all blogs', async () => {
            const response = await api.get('/api/blogs')
            assert.strictEqual(response.body.length, 2)
        })
        
        test('Each blog has id identifier and not _id', async() => {
            const response = await api.get('/api/blogs')
            assert.strictEqual(response.body.every(blog => blog.id), true)
            assert.strictEqual(response.body.every(blog => blog._id), false)
        })  
    })

    describe('Create a blog', () => {
        test('Creates a new blog successfully', async()=> {
            await api.post('/api/blogs')
                .send(testUtils.newBlog)
                .expect('Content-Type',/application\/json/)
                .expect(201)
            const getResponse =  await api.get('/api/blogs')
            const blogsLength = getResponse.body.length
            assert.strictEqual(blogsLength, 3)
            const findSavedBlog = await Blog.findOne({title : 'Exploring the native NodeJS test runner'})
            assert(findSavedBlog)
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
    })

    describe('Default values set', () => {
        test('Default likes set to 0', async() => {
    
            const response = await api.post('/api/blogs')
                .send(testUtils.blogWithMissingLikes)
                .expect('Content-Type', /application\/json/)
                .expect(201)
            assert.strictEqual(response.body.likes,0)
        })
    })
    
    describe('Deletion of blogs', () => {
        test('Blog with specific id is deleted', async () => {
            const allBlogs = await Blog.find({})
            const blogId = allBlogs[0].id
            await api
                .delete(`/api/blogs/${blogId}`)
                .expect(204)
        })

        test('Deletion with invalid id throws 404 status', async() => {
            const nonExistentId = await testUtils.missingBlogId
            await api
                .delete(`/api/blogs/${nonExistentId}`)
                .expect(404)
        })
    })

    describe('Updation of blogs', () => {
        test('Updating existing blog is successful', async() => {
            const allBlogs = await Blog.find({})
            const idToUpdate = allBlogs[0].id
            const response =  await api
                .put(`/api/blogs/${idToUpdate}`)
                .send(testUtils.updatedBlog)
                .expect(200)
            assert.deepStrictEqual(response.body, testUtils.updatedBlog)
        })

        test('Updating non existing blog returns 404 status', async() => {
            await api.put('/api/blogs')
                .send(await git testUtils.missingBlogId())
                .expect(404)
        })
    })
})

after(async() => {
    await mongoose.connection.close()
})