import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test('check title page', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Vue Boilerplate')
})

test('check error message', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('home-example-form-input').fill('')
  await page.getByTestId('home-example-btn-submit').click()
  await expect(page.getByTestId('home-example-error-msg')).toContainText('Username wajib diisi')
})
