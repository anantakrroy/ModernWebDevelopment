import { useState } from 'react'

const BlogForm = ({  handleCreateBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAuthor = (e) => setAuthor(e.target.value)
  const handleTitle = (e) => setTitle(e.target.value)
  const handleUrl = (e) => setUrl(e.target.value)

  const createBlog = (event) => {
    event.preventDefault()
    handleCreateBlog({ title,author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={createBlog}>
      <label htmlFor="title">Title : </label>
      <input
        type="text"
        name="Title"
        id="title"
        value={title}
        onChange={handleTitle} required
      />
      <label htmlFor="author">Author : </label>
      <input
        type="text"
        name="Author"
        id="author"
        value={author}
        onChange={handleAuthor} required
      />
      <label htmlFor=""></label>
      <label htmlFor="url">Url : </label>
      <input
        type="url"
        name="Url"
        id="url"
        value={url}
        onChange={handleUrl} required
      />
      <button type="submit">Create</button>
    </form>
  )
}

export default BlogForm
