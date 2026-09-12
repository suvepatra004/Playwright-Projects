import { test, expect } from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { LoginPage } from "../pages/LoginPage";
import { LoginLocators } from "../locators/LoginLocators";
import { productPageSidebarLocator } from "../locators/ProductPageLocator";
import { productsAddToCart } from "../test-data/productsAddToCart";
import { cartPageLocators } from "../locators/CartPageLocator";

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

  test("Validation of product cart Elements", async ({ page }) => {
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
    productPage = new ProductPage(page);

    await productPage.addFirstProductToCart();
    await productPage.clickOnCartLink();

    await page.locator(cartPageLocators.continueShoppingBtn).click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Validate First product in the Cart page", async ({ page }) => {
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    const firstProductDetail = await productPage.getFirstProductDetails();

    await productPage.addFirstProductToCart();
    await productPage.clickOnCartLink();

    const cartProductDetail = await cartPage.getAllCartProducts();

    expect(cartProductDetail[0]).toEqual(firstProductDetail);
  });

  test.only("Validate All products in the Cart page", async ({ page }) => {
    cartPage = new CartPage(page);
    productPage = new ProductPage(page);

    const allProductDetails = await productPage.getAllProductDetails();

    await productPage.addAllProductsToCart();
    await productPage.clickOnCartLink();

    const allCartProductDetails = await cartPage.getAllCartProducts();

    expect(allCartProductDetails).toEqual(allProductDetails);
  });

  test("Validate Specific product in the Cart page", async ({ page }) => {
    cartPage = new CartPage(page);
  });

  test("Validate Remove product funtionality", async ({ page }) => {
    cartPage = new CartPage(page);
    productPage = new ProductPage(page);

    await productPage.addFirstProductToCart();

    await expect(page.locator(cartPageLocators.cartBadgeCount)).toHaveText("1");

    await productPage.clickOnCartLink();

    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

    await expect(page.locator(cartPageLocators.productNames)).toHaveCount(1);
    await cartPage.removeFirstProduct();

    await expect(page.locator(cartPageLocators.productNames)).toHaveCount(0);
  });
});
