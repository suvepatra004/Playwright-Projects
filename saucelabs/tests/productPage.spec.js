import { test, expect } from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig";
import { ProductPage } from "../pages/ProductPage";
import { LoginPage } from "../pages/LoginPage";
import { LoginLocators } from "../locators/LoginLocators";
import { productPageSidebarLocator } from "../locators/ProductPageLocator";
import { productsAddToCart } from "../test-data/productsAddToCart";

test.describe("Product Validation Page", () => {
  let loginPage;
  let productPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  // Logout
  test("Logout from Product Page", async ({ page }) => {
    productPage = new ProductPage(page);

    await productPage.logout();
    // await expect(page.getByRole("button", { name: /login-button/ }));
    await expect(page.locator(LoginLocators.loginButton));
  });

  // About page
  test("About page validation", async ({ page }) => {
    productPage = new ProductPage(page);

    await productPage.openAboutPage();
    // await expect(
    //   page.locator(productPageSidebarLocator.aboutPageLoginBtn),
    // ).toBeVisible();
    await expect(page.getByRole("button", { text: /Login/ }));
    await page.goBack();
    await expect(page.locator(productPageSidebarLocator.menuSidebarOpen));
  });

  test("Product page validation for all products displayed", async ({
    page,
  }) => {
    productPage = new ProductPage(page);
    await productPage.validateAllProductDisplayed();
  });

  test("Validate add to cart products", async ({ page }) => {
    productPage = new ProductPage(page);

    await productPage.addFirstProductToCart();
    await productPage.addAllProductsToCart();
  });

  test.only("Validate specific add to cart products", async ({ page }) => {
    productPage = new ProductPage(page);

    await productPage.addSpecificProductsToCart(productsAddToCart);
  });

  test("Filter product names A to Z", async ({ page }) => {
    productPage = new ProductPage(page);

    await productPage.filterProductsNameAtoZ();

    const productNames = await productPage.getAllProductNames();

    const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));

    /*
    const isSorted = productNames.every(
      (name, index) => name === sortedNames[index],
    );
    expect(isSorted).toBe(true);
    */

    expect(productNames).toEqual(sortedNames);
  });

  test("Filter product names Z to A", async ({ page }) => {
    productPage = new ProductPage(page);

    await productPage.filterProductsNameZtoA();

    const productNames = await productPage.getAllProductNames();

    const sortedNames = [...productNames].sort().reverse();
    await page.waitForTimeout(4000);
    expect(productNames).toEqual(sortedNames);
  });

  test("Filter product price low to high", async ({ page }) => {
    productPage = new ProductPage(page);

    await productPage.filterProductsPriceLowtoHigh();

    const productPrices = await productPage.getAllProductPrices();

    const sortedPrices = [...productPrices].sort((a, b) => a - b);
    await page.waitForTimeout(4000);

    expect(productPrices).toEqual(sortedPrices);
  });

  test("Filter product price high to low", async ({ page }) => {
    productPage = new ProductPage(page);

    await productPage.filterProductsPriceHightoLow();

    const productPrices = await productPage.getAllProductPrices();

    const sortedPrices = [...productPrices].sort((a, b) => b - a);
    await page.waitForTimeout(4000);

    expect(productPrices).toEqual(sortedPrices);
  });
});
