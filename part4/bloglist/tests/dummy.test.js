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
        const blogs = [
            {
                title: 'You might not need Jest',
                author: 'Pawel Gryzbek',
                url: 'https://pawelgrzybek.com/you-might-not-need-jest-the-node-js-native-test-runner-is-great/',
                likes: 23,
            },
        ]
        assert.strictEqual(listHelper.totalLikes(blogs), 23)
    })

    test('of a bigger list is calculated correctly', () => {
        const blogs = [
            {
                title: 'You might not need Jest',
                author: 'Pawel Gryzbek',
                url: 'https://pawelgrzybek.com/you-might-not-need-jest-the-node-js-native-test-runner-is-great/',
                likes: 23,
            },
            {
                title: 'NodeJS native test runner',
                author: 'Alxander Godwin',
                url: 'https://blog.logrocket.com/exploring-node-js-native-test-runner/',
                likes: 10,
            },
            {
                title: 'HTTP status codes : A guide',
                author: 'Jon Penland',
                url: 'https://kinsta.com/blog/http-status-codes/',
                likes: 4,
            },
        ]
        assert.strictEqual(listHelper.totalLikes(blogs), 37)
    })
})

describe('get the favorite blog', () => {
    test('from list of blogs', () => {
        const blogs = [
            {
                title: 'You might not need Jest',
                author: 'Pawel Gryzbek',
                url: 'https://pawelgrzybek.com/you-might-not-need-jest-the-node-js-native-test-runner-is-great/',
                likes: 23,
            },
            {
                title: 'NodeJS native test runner',
                author: 'Alxander Godwin',
                url: 'https://blog.logrocket.com/exploring-node-js-native-test-runner/',
                likes: 10,
            },
            {
                title: 'HTTP status codes : A guide',
                author: 'Jon Penland',
                url: 'https://kinsta.com/blog/http-status-codes/',
                likes: 4,
            },
        ]
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, {
            title: 'You might not need Jest',
            author: 'Pawel Gryzbek',
            likes: 23,
        })
    })
})

describe('most blogs by author', () => {
    test('return correct result for multiple blogs', () => {
        const blogs = [
            {
                title: 'You might not need Jest',
                author: 'Pawel Gryzbek',
                url: 'https://pawelgrzybek.com/you-might-not-need-jest-the-node-js-native-test-runner-is-great/',
                likes: 23,
            },
            {
                title: 'NodeJS native test runner',
                author: 'Alexander Godwin',
                url: 'https://blog.logrocket.com/exploring-node-js-native-test-runner/',
                likes: 10,
            },
            {
                title: 'HTTP status codes : A guide',
                author: 'Jon Penland',
                url: 'https://kinsta.com/blog/http-status-codes/',
                likes: 4,
            },
            {
                title: 'Introduction to snapshot flags in NodeJS',
                author: 'Alexander Godwin',
                url: 'https://blog.logrocket.com/snapshot-flags-node-js-v18-8/',
                likes: 15
            }
        ]
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, {
            'author' : 'Alexander Godwin',
            'blogs' : 2
        })
    })
})

describe('most likes for an author', () => {
    test('for a list of blogs', () => {
        const blogs = [
            {
                _id: '5a422b3a1b54a676234d17f9',
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 12,
                __v: 0
            },
            {
                _id: '5a422a851b54a676234d17f7',
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/',
                likes: 7,
                __v: 0
            }, {
                _id: '5a422b891b54a676234d17fa',
                title: 'First class tests',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                likes: 10,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
           
            {
                _id: '5a422ba71b54a676234d17fb',
                title: 'TDD harms architecture',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                likes: 0,
                __v: 0
            },
            {
                _id: '5a422bc61b54a676234d17fc',
                title: 'Type wars',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 2,
                __v: 0
            }  
        ]
        const result = listHelper.mostLikes(blogs)
        assert.deepStrictEqual(result, {author: 'Edsger W. Dijkstra', likes: 17})
    })
})
