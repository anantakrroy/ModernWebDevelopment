const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, id: 1, name: 1})
    response.json(blogs)
})

// get a specific blog
// blogsRouter.get('/:id', async(request, response) => {
//     const blog = await Blog.findById(request.params.id).populate('user', {username: 1, name: 1})
//     response.status(200).json(blog)
// })

blogsRouter.post('/', middleware.userExtractor , async (request, response) => {
    const body = request.body
    const decoded = jwt.verify(request.token, process.env.SECRET)
    
    if(!decoded) {
        response.status(401).send({error : 'Invalid token !'})
    }
    
    // find the user 
    const user = await User.findById(request.user.id)
    
    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user
    })
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

// delete blog
blogsRouter.delete('/:id', middleware.userExtractor , async(request, response) => {
    const user = request.user
    const blogToDelete = await Blog.findById(request.params.id)
    
    if(blogToDelete) {
        if(String(blogToDelete.user) === user.id) {
            await Blog.findByIdAndDelete(request.params.id)
            response.status(204).end()
        } else {
            response.status(401).json({'error' : 'Unauthorised operation !'})
        }
    } else {
        response.status(200).json({'error' : 'Blog already deleted or not found !'})
    }
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
