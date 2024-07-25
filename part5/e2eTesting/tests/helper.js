const loginWith = async(page, username, password) => {
    await page.getByRole('button', {name: /login/i}).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', {name: /login/i}).click()
}

const createNote = async(page, note) => {
    await page.getByRole('button', {name: /new note/i}).click()
    await page.getByTestId('newnote').fill(note)
    await page.getByRole('button', {name: /save/i}).click()
}

export {loginWith, createNote}