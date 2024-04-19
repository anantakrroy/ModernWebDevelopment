const Blog = require('../models/Blog')

const dummyUser = {
    'username':'marypop', 
    'name': 'Mary Poppins', 
    'password' : 'mary123'
}

const testBlogsList = [
    {
        title: 'You might not need Jest',
        author: 'Paweł Grzybek',
        url: 'https://pawelgrzybek.com/you-might-not-need-jest-the-node-js-native-test-runner-is-great/',
        likes: 1,
    },
    {
        title: 'Complete guide to HTTP status codes',
        author: 'Jon Penland',
        url: 'https://kinsta.com/blog/http-status-codes/',
        likes: 4,
    },
]

const newBlog = {
    'title':'Exploring the native NodeJS test runner',
    'author':'Alexander Godwin','url':'https://blog.logrocket.com/exploring-node-js-native-test-runner/',
    'likes':5,
}

const missingBlogId = async() => {
    const newBlog = new Blog({
        title: 'Deleted Blog',
        author:'Invalid',
        url: 'https://chd.in/djy'
    })
    await newBlog.save()
    await newBlog.deleteOne()
    return newBlog._id.toString()
}

const blogWithMissingLikes = {
    'title':'Exploring the native NodeJS test runner','author':'Alexander Godwin',
    'url':'https://blog.logrocket.com/exploring-node-js-native-test-runner/'
}

const blogWithMissingTitle = {
    'author':'Alexander Godwin',
    'url':'https://blog.logrocket.com/exploring-node-js-native-test-runner/'
}

const blogWithMissingUrl = {
    'title':'Exploring the native NodeJS test runner','author':'Alexander Godwin',
}

const blogWithMissingTitleAndUrl = {
    'author':'Alexander Godwin',
}

const updatedBlog = {
    title: 'You might not need Jest',
    author: 'Paweł Grzybek',
    url: 'https://pawelgrzybek.com/you-might-not-need-jest-the-node-js-native-test-runner-is-great/',
    likes: 8
}

const invalidUser = {
    username: 'harrypotter',
    name: 'Harry Potter',
    password: 'po'
}

module.exports = {missingBlogId, testBlogsList, newBlog, blogWithMissingLikes, blogWithMissingTitle, blogWithMissingUrl, blogWithMissingTitleAndUrl, updatedBlog, invalidUser, dummyUser}
