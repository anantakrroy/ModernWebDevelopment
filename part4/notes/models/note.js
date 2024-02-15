const mongoose =  require('mongoose')

require('dotenv').config()

const url = process.env.MONGO_URI
console.log('Connecting to DB.... ',)

mongoose.connect(url)
  .then(result => console.log(`Connected to DB...${result}`))
  .catch(error => console.log('Error connecting to DB....', error))

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = String(returnedObj._id)
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)