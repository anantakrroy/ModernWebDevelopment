const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then((blogs) => response.json(blogs))
})

blogsRouter.post('/', (request, response) => {
    const newBlog = new Blog(request.body)
    newBlog
        .save()
        .then(() =>
            response
                .status(201)
                .json({ message: 'New blog added to list ! ', blog: newBlog })
        )
})

module.exports = blogsRouter
