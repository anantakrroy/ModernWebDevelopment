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

module.exports = { dummy, totalLikes, favoriteBlog }
