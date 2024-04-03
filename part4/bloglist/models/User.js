const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        unique: true,
        required: true
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = String(returnedObject._id)
        delete(returnedObject.__v)
        delete(returnedObject._id)
        delete(returnedObject.passwordHash)
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User