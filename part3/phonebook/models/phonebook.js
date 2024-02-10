require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGO_URI;

mongoose.set('strictQuery', false);

mongoose
  .connect(url)
  .then(() => console.log('Connected to DB.....'))
  .catch((error) => console.log(`Error connecting to DB.....${error}`));

// Phonebook schema
const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(num) {
        return /(^\d{2,3})-(\d+$)/.test(num);
      },
      message : function(props) {
        return `Invalid phone number : ${props.value} !!`;
      }
    },
    required: [true, 'Phone number is required !']
  },
});

phoneSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = String(returnedObj._id);
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model('Phone', phoneSchema);
