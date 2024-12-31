import { test, expect } from '@playwright/test';

test.describe("navigation test", () => {
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
})

test.describe('failing tests', () =>{
  test('incorrect title', async ({page}) =>{
    await page.goto('https://playwright.dev/')

    await expect(page).toHaveTitle(/Playwrights/);
  })
})

test('test codegen', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/')
  await expect(page.getByRole('heading')).toContainText('todos');
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('Click on todos');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await expect(page.getByTestId('todo-title')).toContainText('Click on todos');
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('More todos');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await expect(page.locator('body')).toContainText('More todos');
  await page.locator('li').filter({ hasText: 'Click on todos' }).getByLabel('Toggle Todo').check();
  await page.locator('li').filter({ hasText: 'More todos' }).getByLabel('Toggle Todo').check();
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('Last one');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByRole('button', { name: 'Clear completed' }).click();
  await page.getByTestId('todo-title').click();
  await expect(page.getByTestId('todo-title')).toContainText('Last one');
  await page.getByText('All Active Completed').click();
  await expect(page.locator('body')).toContainText('1 item left');
});

