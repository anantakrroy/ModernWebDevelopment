const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const newBlog = new Blog(request.body)
    const savedBlog = await newBlog.save()
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
