import { test, expect } from '@playwright/test';

//Open site
const URL = 'https://www.saucedemo.com';

test.describe('Login', () => {

  //Test 1 - Valid Login
  test('should login with valid credentials', async ({ page }) => {
    await page.goto(URL);
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(`${URL}/inventory.html`);
  });

  //Test 2 - Invalid Login
  test('should not login with invalid credentials', async ({ page }) => {
    await page.goto(URL);
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  //Test 3 - Empty fields login
  test('should not login with empty fields', async ({ page }) => {
    await page.goto(URL);
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

});