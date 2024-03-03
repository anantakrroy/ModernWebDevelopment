const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: {type: Number, default: 0}
})

blogSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = String(returnedObj._id)
        delete returnedObj._id
        delete returnedObj.__v
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog