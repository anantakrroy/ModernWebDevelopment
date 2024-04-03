const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, id: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const users = await User.find({})
    const user  = users[0]
    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user.id
    })
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async(request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async(request, response) => {
    const body = request.body
    const updatedBlog = {
        title: body.title,
        url: body.url,
        likes: body.likes,
        author: body.author
    }
    await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {new:true})
    response.json(updatedBlog)
})

module.exports = blogsRouter
