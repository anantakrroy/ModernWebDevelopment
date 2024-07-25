const { describe, beforeEach, test, expect } = require("@playwright/test");
import {loginWith, createNote} from './helper'

describe("Note App", () => {
  beforeEach(async({page, request}) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Bohe Root',
        username: 'rootyroot',
        password: 'root123'
      }
    })

    // can use relative urls now because of baseurl definition in
    // playwright.config.js file
    await page.goto('/')
  })

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        "Note app, Department of Computer Science, University of Helsinki 2024"
      )
    ).toBeVisible();
  });

  test('Login form can be opened', async({page}) => {
    await page.getByRole('button', /login/i).click()

    // Use the first() & last() methods to find textboxes in login form -- not recommended
    // await page.getByRole('textbox').first().fill('rootyroot')
    // await page.getByRole('textbox').last().fill('root123')

    // Use the all() method to get all the textboxes in the page -- not recommended
    // const textboxes = await page.getByRole('textbox').all()
    // await textboxes[0].fill('rootyroot')
    // await textboxes[1].fill('root123')

    // Use the getByTestId to get all the textboxes 
    await page.getByTestId('username').fill('rootyroot')
    await page.getByTestId('password').fill('root123')

    await page.getByRole('button', {name : 'Login'}).click()

    await expect(page.getByText('Bohe Root logged in')).toBeVisible()
  })

  describe('When the user is logged in ...', () => {
    beforeEach(async({page}) => {
      await loginWith(page, 'rootyroot','root123')
    })

    test('A new note can be created', async({page}) => {
      await createNote(page, 'This note is created using playwright')
      await expect(page.getByText('This note is created using playwright')).toBeVisible()
    })
    
    describe('A note exists ...', () => {
      beforeEach(async({page}) => {
        await createNote(page, 'Another note created by Playwright')
      })

      test('Change importance of note', async({page}) => {
        await page.getByRole('button', {name: /make not important/i}).click()
        await expect(page.getByRole('button', {name: /make important/i})).toBeVisible()
      })
    })
  })

  test('Login fails when the password is wrong' , async({page}) => {
    await loginWith(page, 'rootyroot', 'fj34')
    await expect(page.getByText('Wrong credentials !')).toBeVisible()

    // alternate : test if the error message is printed in its own css class.
    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong credentials !')
    // test is the locator contains the CSS styles
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('border-radius', '5px')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    // ensure that the user is not logged in
    await expect(page.getByText('Bohe Root logged in')).not.toBeVisible()
  })
});
