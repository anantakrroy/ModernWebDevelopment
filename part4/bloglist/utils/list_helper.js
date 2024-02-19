const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likesSum = blogs.reduce((acc, curr) => acc + curr.likes, 0)
    return likesSum
}

const favoriteBlog = (blogs) => {
    const favBlog = blogs.sort((a, b) => b.likes - a.likes)[0]
    return {title : favBlog.title,author : favBlog.author,likes:  favBlog.likes}
}

const mostBlogs = (blogs) => {
    // group the blogs by author names
    const authCount = _.groupBy(blogs, 'author')

    // write iteratee function for map
    function result(blog, index) {
        return {
            author: index,
            blogs: blog.length
        }
    }
    const blogCount = _.map(authCount, result)

    // sort by blog count
    const sortBlogCount = _.sortBy(blogCount, 'blogs')
    const highestBlogAuthor = sortBlogCount[sortBlogCount.length - 1]
    return highestBlogAuthor
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
