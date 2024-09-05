// @ts-check
const { test, expect, beforeEach, describe } = require('@playwright/test');

describe('Blog app', () => {
  beforeEach(async({page}) => {
    await page.goto('http://localhost:5173')
  })

// show login form by default
  test('Show login form by default', async({page}) => {
    const locator = await page.locator('form')
    await expect(locator).toBeVisible()
  })
})