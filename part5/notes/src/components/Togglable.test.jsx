import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Togglable from './Togglable'

describe('Togglable component', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">
                    togglable content
        </div>
      </Togglable>
    ).container
  })

  test('renders its children', async() => {
    await screen.getAllByText('togglable content')
  })


  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    // screen.debug(div)
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()

    const cancelButton = screen.getByText('cancel')
    const showButton = screen.getByText('show...')

    screen.debug(showButton)
    screen.debug(cancelButton)

    await user.click(showButton)
    await user.click(cancelButton)
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display : none')
  })
})