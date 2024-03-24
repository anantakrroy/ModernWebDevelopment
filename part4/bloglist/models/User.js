const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String
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