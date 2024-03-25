const mongoose = require('mongoose')
const {describe, test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const {invalidUser} = require('./test_utils')

const app = require('./../app')
const User = require('../models/User')
const api = supertest(app)

beforeEach(async() => {
    await User.deleteMany({})
})

describe('Test users api', () => {
    test('Password less than 3 characters returns 400 status',async () => {
        const response = await api.post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.error, 'Password must contain minimum 3 characters!')
    })

    test('Username less than 3 characters returns 400 status', async () => {
        const response = await api.post('/api/users')
            .send({
                'username' : 'ha',
                'name' :'HappyHappy',
                'password' : 'meh123'
            })
        assert(response.body.error.includes('User validation failed'))
    })

    test('Empty password returns 400 status', async() => {
        const response = await api.post('/api/users')
            .send({
                'username' : 'marypoppins',
                'name' : 'Mary'
            }).expect(400).expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.error, 'Password is required!')
    })

    test('Empty username returns 400 status', async () => {
        await api.post('/api/users')
            .send({
                'name' : 'Mary Poppins',
                'password' : 'pass'
            })
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

})

after(async() => {
    await mongoose.connection.close()
})