import { test, expect } from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { LoginPage } from "../pages/LoginPage";
import { LoginLocators } from "../locators/LoginLocators";
import { productPageSidebarLocator } from "../locators/ProductPageLocator";
import { productsAddToCart } from "../test-data/productsAddToCart";

test.describe("Cart Page Validation", () => {
  let loginPage;
  let productPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Validation of product cart page", async ({ page }) => {
    productPage = new ProductPage(page);

    await productPage.clickOnCartLink();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
  });

  test.only("Validation of product cart Elements", async ({ page }) => {
    cartPage = new CartPage(page);
    productPage = new ProductPage(page);

    // Add product to Cart to validate the Cart UI elements
    // await page.waitForTimeout(2000);
    await productPage.addFirstProductToCart();
    await productPage.clickOnCartLink();

    const UI = await cartPage.getCartPageElements();
    await expect(UI.cartTitle).toBeVisible();
    await expect(UI.checkout).toBeVisible();
    await expect(UI.shoppingCartBtn).toBeVisible();
    await page.waitForTimeout(2000);
  });

  test("Validate Continue Shopping functionality", async ({ page }) => {
    cartPage = new CartPage(page);
  });

  test("Validate Single product in the Cart page", async ({ page }) => {
    cartPage = new CartPage(page);
  });

  test("Validate All products in the Cart page", async ({ page }) => {
    cartPage = new CartPage(page);
  });

  test("Validate Specific product in the Cart page", async ({ page }) => {
    cartPage = new CartPage(page);
  });

  test("Validate Remove product funtionality", async ({ page }) => {
    cartPage = new CartPage(page);
  });
});
