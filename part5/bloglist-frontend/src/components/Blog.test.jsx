import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("Blog component renders author and title only", () => {
  const blog = {
    title: "Data types in Javascript",
    author: "Lisa Tagliaferri",
    url: "https://www.digitalocean.com/community/tutorials/understanding-data-types-in-javascript",
    likes: 9,
    user: {
      username: "marypop",
      name: "Mary Poppins",
      id: "660cdabc0602286500d78c9e",
    },
    id: "6655d9fb3658db08ee7e4dc1",
  };

//   render Blog component
  const {container} = render(<Blog blog={blog} />)
//   select the element
  const div = container.querySelector(".blog")
  screen.debug(div)

  expect(div).toBeDefined()
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).not.toHaveTextContent(blog.likes)
  expect(div).not.toHaveTextContent(blog.url)
});
