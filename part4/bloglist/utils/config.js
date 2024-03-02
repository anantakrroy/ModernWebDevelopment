require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGO_URI = process.env.NODE_ENV === 'dev' ? process.env.MONGO_URI : process.env.TEST_MONGO_URI

module.exports = {PORT, MONGO_URI}