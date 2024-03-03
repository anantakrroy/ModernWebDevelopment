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

module.exports = blogsRouter
