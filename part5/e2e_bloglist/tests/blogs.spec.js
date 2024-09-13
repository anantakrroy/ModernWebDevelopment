const { test, expect, beforeEach, describe } = require('@playwright/test');
import {loginWith, createBlog} from './helpers'


describe('Blog app', () => {
  beforeEach(async({page, request}) => {
    await page.goto('http://localhost:5173')
    await request.get('/api/reset')
    // create two users for Ex 5.22
    await request.post('/api/users', {
      data: {
        username: 'rootyroot',
        name: 'Bohe Root',
        password: 'root123'
      }
    })
    await request.post('/api/users', {
      data: {
        username: 'evanana',
        name: 'Ana Evans',
        password: 'ana123'
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
      await page.getByRole('button',{name:/login/i}).click()

      await expect(page.getByText('User : Bohe Root is logged in....')).toBeVisible()
    })

    test('Login user failed', async({page}) => {
      await page.getByTestId('username').fill('fkldss')
      await page.getByTestId('password').fill('fkldss')
      await page.getByRole('button').click()

      await expect(page.getByText(`failed to log in ...`)).toBeVisible()
    })
  })

  // Logged in user
  describe('Logged in user can', () => {
    beforeEach(async({page}) => {
      await loginWith(page, 'rootyroot', 'root123')
    })

    test('Create new blog', async({page}) => {
      await createBlog(page, 'Mastering JavaScript: 10 Tips for Cleaner Code', 'Sarah Thompson', 'https://www.techinsightsblog.com/mastering-javascript-tips-sarah-thompson')

      await expect(page.getByRole('link', {name: /Mastering JavaScript: 10 Tips for Cleaner Code/i})).toBeVisible()
    })

    test('Like a blog', async({page}) => {
      await createBlog(page, 'Mastering JavaScript: 10 Tips for Cleaner Code', 'Sarah Thompson', 'https://www.techinsightsblog.com/mastering-javascript-tips-sarah-thompson')

      await page.getByRole('button', {name: /view/i}).click()
      await page.getByRole('button', {name: /like/i}).click()

      await expect(page.getByText('Likes : 1')).toBeVisible()
    })

    test('Delete a blog', async({page}) => {
      await createBlog(page, 'Mastering JavaScript: 10 Tips for Cleaner Code', 'Sarah Thompson', 'https://www.techinsightsblog.com/mastering-javascript-tips-sarah-thompson')
      await page.getByRole('button', {name: /view/i}).click()
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', {name: /delete/i}).click()
      await expect(page.getByRole('link', {name: /Mastering JavaScript: 10 Tips for Cleaner Code', 'Sarah Thompson/i})).not.toBeVisible
    })

    test('Delete button only shown for user who created the blog', async({page}) => {
      await createBlog(page, 'Mastering JavaScript: 10 Tips for Cleaner Code', 'Sarah Thompson', 'https://www.techinsightsblog.com/mastering-javascript-tips-sarah-thompson')
      await page.getByRole('button', {name: /logout/i}).click()
      await loginWith(page, 'evanana', 'ana123')
      await page.getByRole('button', {name: /view/i}).click()

      await expect(page.getByRole('button', {name: /delete/i})).not.toBeVisible()
    })
  })
})