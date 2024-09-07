const {test, after, beforeEach, describe} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('./../models/Blog')
const User = require('./../models/User')
const testUtils = require('./test_utils')

const app = require('./../app')

const api = supertest(app)


describe('Blog list test suite', () => {
    beforeEach(async() => {
        await User.deleteMany({})
        await api
            .post('/api/users')
            .send(testUtils.dummyUser)
    
        const user = await User.findOne({username : testUtils.dummyUser.username})
        await Blog.deleteMany({})
        for(let blog of testUtils.testBlogsList) {
            await new Blog({...blog, user: user.id}).save()
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
            // login user to get the token
            const res = await api
                .post('/api/login')
                .send({
                    'username' : testUtils.dummyUser.username,
                    'password' : testUtils.dummyUser.password,
                })
            const token = res.body.token
            
            // make a POST req to the /api/blogs AND then
            // compare assertions, expect
            
            await api.post('/api/blogs')
                .send(testUtils.newBlog)
                .set('authorization', `Bearer ${token}`)
                .expect(201)
                .expect('Content-Type', /application\/json/)
        })  

        test('Missing title or url throws 400 status', async() => {
            // login user to get the token
            const res = await api
                .post('/api/login')
                .send({
                    'username' : testUtils.dummyUser.username,
                    'password' : testUtils.dummyUser.password,
                })

            const token = res.body.token
            
            await api
                .post('/api/blogs')
                .send(testUtils.blogWithMissingTitle)
                .set('authorization', `Bearer ${token}`)
                .expect(400)
        
            await api
                .post('/api/blogs')
                .send(testUtils.blogWithMissingUrl)
                .set('authorization', `Bearer ${token}`)
                .expect(400)
        
            await api
                .post('/api/blogs')
                .send(testUtils.blogWithMissingTitleAndUrl)
                .set('authorization', `Bearer ${token}`)
                .expect(400)
        })  
        
        test('Missing token throws a 401 status', async() => {
            const blog = await Blog.find({}[0])
            await api
                .post('/api/blogs')
                .send(blog)
                .expect(401)
                .expect('Content-Type', /application\/json/)
        })
    })

    describe('Default value for likes set', () => {
        test('Default likes set to 0', async() => {
            // login user to get the token
            const res = await api
                .post('/api/login')
                .send({
                    'username' : testUtils.dummyUser.username,
                    'password' : testUtils.dummyUser.password,
                })
            const token = res.body.token
            
            const response = await api.post('/api/blogs')
                .send(testUtils.blogWithMissingLikes)
                .set('authorization', `Bearer ${token}`)
                .expect('Content-Type', /application\/json/)
                .expect(201)
            assert.strictEqual(response.body.likes,0)
        })
    })
    
    describe('Deletion of blogs', () => {
        test('Blog with specific id is deleted', async () => {
            // login user to get the token
            const res = await api
                .post('/api/login')
                .send({
                    'username' : testUtils.dummyUser.username,
                    'password' : testUtils.dummyUser.password
                })
            const token = res.body.token
            
            const allBlogs = await Blog.find({})
            const blogId = allBlogs[0].id

            await api
                .delete(`/api/blogs/${blogId}`)
                .set('authorization', `Bearer ${token}`)
                .expect(204)
        })

        test('Deletion with invalid id throws 404 status', async() => {
            // login user to get the token
            const res = await api
                .post('/api/login')
                .send({
                    'username' : testUtils.dummyUser.username,
                    'password' : testUtils.dummyUser.password,
                })
            const token = res.body.token
            
            const nonExistentId = await testUtils.missingBlogId
            await api
                .delete(`/api/blogs/${nonExistentId}`)
                .set('authorization', `Bearer ${token}`)
                .expect(404)
        })
    })

    describe('Updation of blogs', () => {
        test('Updating existing blog is successful', async () => {
            const allBlogs = await Blog.find({})
            const idToUpdate = allBlogs[0].id

            const res = await api.post('/api/login').send({
                username: testUtils.dummyUser.username,
                password: testUtils.dummyUser.password,
            })
            const token = res.body.token

            const response = await api
                .put(`/api/blogs/${idToUpdate}`)
                .set('Authorization', `Bearer ${token}`)
                .send(testUtils.updatedBlog)
                .expect(200)
            const {title,url, likes, author} = response.body
            assert.deepStrictEqual({title,url, likes, author}, testUtils.updatedBlog)
        })

        test('Updating non existing blog returns 404 status', async() => {
            await api.put('/api/blogs')
                .send(await testUtils.missingBlogId())
                .expect(404)
        })
    })
})

after(async() => {
    await mongoose.connection.close()
})