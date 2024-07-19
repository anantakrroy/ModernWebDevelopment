const { describe, beforeEach, test, expect } = require("@playwright/test");

describe("Note App", () => {
  beforeEach(async({page}) => {
    await page.goto('http://localhost:5173')
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
});
