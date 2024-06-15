import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteForm from './NoteForm'

let container
const createNote = vi.fn()

beforeEach(() => {
  container = render(<NoteForm createNote={createNote} />).container
})

test('note form is rendered', () => {
  screen.debug(container)
  const div = container.querySelector('.formDiv')
  expect(div).toBeDefined()
})

test('NoteForm updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()

  // getByRole ---> tests get access to form input using getByRole
  // method 'type' of userEvent is used to write text in input fields.
  const input = screen.getByRole('textbox')
  const submitBtn = screen.getByText('Save')

  await user.type(input, 'testing the note form...')
  await user.click(submitBtn)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing the note form...')
})
