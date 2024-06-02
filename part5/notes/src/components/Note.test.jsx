import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'
import { expect } from 'vitest'

// using 'expect' method
// test('renders content', () => {
//   const note = {
//     content: 'Component testing using react-testing-library',
//     important: true,
//   }

//   render(<Note note={note}/>)

//   const element = screen.getByText('Component testing using react-testing-library')
//   expect(element).toBeDefined()
// })

// using CSS selectors
test('renders content', () => {
  const note = {
    content : 'Component testing using react-testing-library',
    important: true
  }

  const { container } = render(<Note note={note}/>)
  // const div = container.querySelector('.note')
  const li = screen.getByText('Component testing using react-testing-library')

  screen.debug(li)

  expect(li).toHaveTextContent('Component testing using react-testing-library')
})

test('clicking button calls event handler once',async() => {
  const note = {
    content : 'Testing the button click event',
    important : false
  }

  // event handler defined by vitest
  const mockHandler = vi.fn()

  // render test component
  render(<Note note={note} toggleImportance={mockHandler}/>)

  // session start with rendered component
  const user = userEvent.setup()
  // select the component
  const button = screen.getByText('make important')
  await user.click(button)

  // test assertion
  expect(mockHandler.mock.calls).toHaveLength(1)
})