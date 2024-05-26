const BlogForm = ({title, author, url, handleCreateBlog, handleTitle, handleAuthor, handleUrl}) => {
  return (
    <form onSubmit={handleCreateBlog}>
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
  );
};

export default BlogForm;
