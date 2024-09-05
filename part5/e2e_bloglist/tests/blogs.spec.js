// @ts-check
const { test, expect, beforeEach, describe } = require('@playwright/test');


describe('Blog app', () => {
  beforeEach(async({page, request}) => {
    await page.goto('http://localhost:5173')
    await request.get('/api/reset')
    await request.post('/api/users', {
      data: {
        username: 'rootyroot',
        name: 'Bohe Root',
        password: 'root123'
      }
    })
  })

// show login form by default
  test('Show login form by default', async({page}) => {
    const locator = await page.locator('form')
    await expect(locator).toBeVisible()
  })

  // Login test
  describe('Login testing', () => {
    test('User login success', async({page}) => {
      await page.getByTestId('username').fill('rootyroot')
      await page.getByTestId('password').fill('root123')
      await page.getByRole('button').click()

      await expect(page.getByText('User : Bohe Root is logged in....')).toBeVisible()
    })

    test('Login user failed', async({page}) => {
      await page.getByTestId('username').fill('fkldss')
      await page.getByTestId('password').fill('fkldss')
      await page.getByRole('button').click()

      await expect(page.getByText(`failed to log in ...`)).toBeVisible()
    })
  })
})