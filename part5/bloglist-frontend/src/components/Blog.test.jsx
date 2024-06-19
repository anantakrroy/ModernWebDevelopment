import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Blog from './Blog'
import { describe } from 'vitest'

let blog = {
  title: 'Data types in Javascript',
  author: 'Lisa Tagliaferri',
  url: 'https://www.digitalocean.com/community/tutorials/understanding-data-types-in-javascript',
  likes: 9,
  user: {
    username: 'marypop',
    name: 'Mary Poppins',
    id: '660cdabc0602286500d78c9e',
  },
  id: '6655d9fb3658db08ee7e4dc1',
}

const mock = vi.fn()

describe('Blog component frontend tests : ', () => {
  test('Blog component renders author and title only', () => {
    //   render Blog component
    const { container } = render(<Blog blog={blog} handleLikes={mock}/>)
    //   select the element
    const div = container.querySelector('.blog')
    //   screen.debug(div);

    expect(div).toBeDefined()
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).not.toHaveTextContent(blog.likes)
    expect(div).not.toHaveTextContent(blog.url)
  })

  test('Blog component button click shows url and likes', async () => {
    //   render the Blog component
    const { container } = render(<Blog blog={blog} handleLikes={mock}/>)
    //   select the element with classname
    const div = container.querySelector('.blog')
    //   screen.debug(div)
    //   select the button element
    const button = screen.getByText(/View/)
    //   create a mock event handler
    const clickHandler = vi.fn()
    //   screen.debug(button);
    //   setup a new session
    const user = userEvent.setup()
    //   button click
    await user.click(button)

    //   assertions
    expect(div).toHaveTextContent(`Likes : ${blog.likes}`)
    expect(div).toHaveTextContent(blog.url)
  })

  test('Clicking button twice calls event handler on Blog component twice', async () => {
    const user = userEvent.setup()
    const {container} = render(<Blog blog={blog} handleLikes={mock} />)
    const viewBtn = screen.getByText(/View/)
    // screen.debug(viewBtn)
    await user.click(viewBtn)
    const likeBtn = container.querySelector(".likeBtn")
    // screen.debug(likeBtn)
    await user.click(likeBtn)
    await user.click(likeBtn)

    expect(mock.mock.calls).toHaveLength(2)
  })
})
