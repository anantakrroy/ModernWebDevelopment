import { useState } from 'react'
import blogService from './../services/blogs'

const Blog = ({ blog }) => {
  const [isDetailView, setDetailView] = useState(false)
  const [view, setView] = useState(blog)

  let token = JSON.parse(window.localStorage.getItem('loggedInUser')).data
    .token

  const showDetail = () => {
    setDetailView(!isDetailView)
  }

  const updateLikeCount = async (blog, id) => {
    try {
      const updatedBlog = {
        title: blog.title,
        url: blog.url,
        likes: ++blog.likes,
        author: blog.author,
        user: blog.user.id,
      }
      const response = await blogService.update(updatedBlog, id, token)
      setView(response)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="blog">
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.title} by {blog.author}
      </a>
      <button id={blog.id} onClick={showDetail}>
        {' '}
        {isDetailView ? 'Hide' : 'View'}{' '}
      </button>
      {isDetailView ? (
        <div>
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
          <p>
            Likes : {blog.likes}{' '}
            <button onClick={() => updateLikeCount(blog, blog.id)}>Like</button>
          </p>
          <p>{blog.user.name}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Blog
