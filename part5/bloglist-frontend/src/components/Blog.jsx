const Blog = ({ blog }) => (
  <div>
    <a href={blog.url} target="_blank">{blog.title} by {blog.author}</a>
  </div>  
)

export default Blog