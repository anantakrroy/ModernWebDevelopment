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

const blogWithMissingLikes = {
    'title':'Exploring the native NodeJS test runner','author':'Alexander Godwin',
    'url':'https://blog.logrocket.com/exploring-node-js-native-test-runner/'
}

const newBlog = {
    'title':'Exploring the native NodeJS test runner','author':'Alexander Godwin','url':'https://blog.logrocket.com/exploring-node-js-native-test-runner/','likes':5
}

module.exports = {testBlogsList, blogWithMissingLikes, newBlog}
