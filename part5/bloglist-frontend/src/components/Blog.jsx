import { useState } from "react";

const Blog = ({ blog }) => {
  const [isDetailView, setDetailView] = useState(false);

  const showDetail = () => {
    setDetailView(!isDetailView);
  };

  return (
    <div className="blog">
      <a href={blog.url} target="_blank">
        {blog.title} by {blog.author}
      </a>
      <button id={blog.id} onClick={showDetail}>
        {" "}
        {isDetailView ? "Hide" : "View"}{" "}
      </button>
      {isDetailView ? (
        <div>
          <a href={blog.url} target="_blank">
            {blog.url}
          </a>
          <p>
            Likes : {blog.likes} <button>Like</button>
          </p>
          <p>{blog.user.name}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Blog;
