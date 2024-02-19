const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('get total likes', () => {
    test('of empty list is zero', () => {
        const blogs = []
        assert.strictEqual(listHelper.totalLikes(blogs), 0)
    })

    test('when list has only one blog, total likes is equal to likes of that blog', () => {
        const blogs = [{
            title : 'You might not need Jest',
            author : 'Pawel Gryzbek',
            url: 'https://pawelgrzybek.com/you-might-not-need-jest-the-node-js-native-test-runner-is-great/',
            likes: 23
        }]
        assert.strictEqual(listHelper.totalLikes(blogs), 23)
    })

    test('of a bigger list is calculated correctly', () => {
        const blogs = [{
            title : 'You might not need Jest',
            author : 'Pawel Gryzbek',
            url: 'https://pawelgrzybek.com/you-might-not-need-jest-the-node-js-native-test-runner-is-great/',
            likes: 23
        },
        {
            title : 'NodeJS native test runner',
            author: 'Alxander Godwin',
            url: 'https://blog.logrocket.com/exploring-node-js-native-test-runner/',
            likes: 10
        },
        {
            title : 'HTTP status codes : A guide',
            author: 'Jon Penland',
            url: 'https://kinsta.com/blog/http-status-codes/',
            likes: 4
        }
        ]
        assert.strictEqual(listHelper.totalLikes(blogs), 37)
    })
})
