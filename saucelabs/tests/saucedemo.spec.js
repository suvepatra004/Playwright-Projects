import { test, expect } from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig";
import { LoginPage } from "../pages/LoginPage";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory.html/);
});

// Using POM or Script Framework
test("Login to Sauce Demo website", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto(BASE_URL);
  await loginPage.login(USERNAME, PASSWORD);
  await expect(page).toHaveURL(/inventory.html/);
});

// test("Login to Sauce Demo website", async ({ page }) => {
//   await expect(page.locator(".title")).toHaveText("Products");
// });

// Add to cart from Inventory lists
// test("Add and remove products from the cart", async ({ page }) => {
//   await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
//   await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

//   await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(
//     "2",
//   );

//   await page.locator('[data-test="shopping-cart-link"]').click();

//   await expect(page).toHaveURL(/cart.html/);
//   await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);

//   await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
//   await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

//   await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);
// });
