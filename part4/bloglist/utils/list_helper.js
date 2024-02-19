const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likesSum = blogs.reduce((acc, curr) => acc + curr.likes , 0) 
    return likesSum
}

module.exports = {dummy, totalLikes}