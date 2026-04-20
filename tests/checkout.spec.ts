import { test, expect } from '@playwright/test';

//Open site
const URL = 'https://www.saucedemo.com';

test.describe('Checkout', () => {

  //Login
    test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="shopping-cart-link"]');
    await page.click('[data-test="checkout"]');
  });

  //Checkout OK
  test('should complete checkout with valid information', async ({ page }) => {
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await page.click('[data-test="finish"]');
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  });

  //Checkout with empty first name
  test('should not proceed with empty first name', async ({ page }) => {
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('should not proceed with empty last name', async ({ page }) => {
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  //Checkout with empty postal code
  test('should not proceed with empty postal code', async ({ page }) => {
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.click('[data-test="continue"]');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  //Order summary
  test('should display order summary before finishing', async ({ page }) => {
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);
    await expect(page.locator('[data-test="total-label"]')).toBeVisible();
  });

});