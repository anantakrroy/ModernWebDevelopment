import { useState } from 'react'
import blogService from './../services/blogs'

const Blog = ({ blog, handleLikes }) => {
  const [isDetailView, setDetailView] = useState(false)

  const showDetail = () => {
    setDetailView(!isDetailView)
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
            <button className='likeBtn' onClick={() => handleLikes(blog)}>Like</button>
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
