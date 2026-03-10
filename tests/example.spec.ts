import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Open qauto', async ({ page }) => {
  await page.goto('/');
});

test.describe('First tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  })
  test('Search', async ({ page }) => {
    // await page.locator('h1').highlight();
    // await page.locator('nav', { has: page.locator('a') }).highlight();
    // await page.getByRole('heading', { name: 'Do More!' }).highlight();
    // await page.getByText('Do').highlight();
    await page.getByText('Do', { exact: true }).highlight();
  })

  test('Filter', async ({ page }) => {
    // await page.locator('button').filter({ hasText: 'Contacts' }).highlight();
    // await page.locator('button').first().highlight();
    // await page.locator('button').last().highlight();
    // await page.locator('button').nth(3).highlight();

    let buttons = page.locator('button');

    for (const button of await buttons.all()) {
      console.log(await button.innerText());
    }
    console.log(await buttons.count());
  })
})
