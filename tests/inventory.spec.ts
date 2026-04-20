import { test, expect } from '@playwright/test';

//Open site
const URL = 'https://www.saucedemo.com';

test.describe('Inventory', () => {

    //Login
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  });

  //Display list
  test('should display product list', async ({ page }) => {
    const items = page.locator('[data-test="inventory-item"]');
    await expect(items).toHaveCount(6);
  });

  //Sort list
  test('should sort products by name Z to A', async ({ page }) => {
    await page.selectOption('[data-test="product-sort-container"]', 'za');
    const firstProduct = page.locator('[data-test="inventory-item-name"]').first();
    await expect(firstProduct).toHaveText('Test.allTheThings() T-Shirt (Red)');
  });

  //Sort list 2
  test('should sort products by name A to Z', async ({ page }) => {
    await page.selectOption('[data-test="product-sort-container"]', 'az');
    const firstProduct = page.locator('[data-test="inventory-item-name"]').first();
    await expect(firstProduct).toHaveText('Sauce Labs Backpack');
  });

  //Sort list 3
  test('should sort products by price low to high', async ({ page }) => {
    await page.selectOption('[data-test="product-sort-container"]', 'lohi');
    const firstProduct = page.locator('[data-test="inventory-item-name"]').first();
    await expect(firstProduct).toHaveText('Sauce Labs Onesie');
  });

  //Sort list 4
  test('should sort products by price high to low', async ({ page }) => {
    await page.selectOption('[data-test="product-sort-container"]', 'hilo');
    const firstProduct = page.locator('[data-test="inventory-item-name"]').first();
    await expect(firstProduct).toHaveText('Sauce Labs Fleece Jacket');
  });

  //Sort list 5
  test('should navigate to product detail page', async ({ page }) => {
    await page.click('[data-test="item-4-title-link"]');
    await expect(page).toHaveURL(/.*inventory-item.html/);
    await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible();
  });

});