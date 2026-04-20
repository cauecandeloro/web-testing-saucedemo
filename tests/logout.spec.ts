import { test, expect } from '@playwright/test';

//Open site
const URL = 'https://www.saucedemo.com';

test.describe('Logout', () => {

    //Login
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  });

  //Logout
  test('should logout successfully', async ({ page }) => {
    await page.click('#react-burger-menu-btn');
    await page.click('[data-test="logout-sidebar-link"]');
    await expect(page).toHaveURL(URL + '/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  //Access inventory after logout
  test('should not access inventory after logout', async ({ page }) => {
    await page.click('#react-burger-menu-btn');
    await page.click('[data-test="logout-sidebar-link"]');
    await page.goto(URL + '/inventory.html');
    await expect(page).toHaveURL(URL + '/');
  });

});