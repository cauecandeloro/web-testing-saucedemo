import { test, expect } from '@playwright/test';

//Open site
const URL = 'https://www.saucedemo.com';

test.describe('Cart', () => {

    //Login
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  });

  //Add product
  test('should add a product to the cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="shopping-cart-link"]');
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);
  });

  //Remove product
  test('should remove a product from the cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="shopping-cart-link"]');
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);
  });

  //Update cart
  test('should update cart badge when adding a product', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  //Add multiple products
  test('should add multiple products to the cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('[data-test="shopping-cart-link"]');
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);
  });

});