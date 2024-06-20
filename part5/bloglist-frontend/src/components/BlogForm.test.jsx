import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

const testBlog = {
  'title' : 'Modify DOM order with tabindex ',
  'author' : 'Dave Gash',
  'url' : 'https://web.dev/articles/using-tabindex?hl=en'
}

describe('Blog Form frontend component testing', () => {
  test('Form calls event handler with correct blog when a new blog is created', async() => {
    const mockHandler = vi.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm handleCreateBlog={mockHandler} />)

    const titleInput = container.querySelector('#title')
    const authorInput = container.querySelector('#author')
    const urlInput = container.querySelector('#url')
    const createBtn = screen.getByText(/Create/)

    await user.type(titleInput, testBlog.title)
    await user.type(authorInput, testBlog.author)
    await user.type(urlInput, testBlog.url)

    await user.click(createBtn)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]).toEqual(testBlog)
  })
})