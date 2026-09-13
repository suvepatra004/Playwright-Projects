import { test, expect } from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig";
import { CartPage } from "../pages/CartPage";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { LoginLocators } from "../locators/LoginLocators";
import { productPageSidebarLocator } from "../locators/ProductPageLocator";
import { productsAddToCart } from "../test-data/productsAddToCart";
import { checkoutPageLocator } from "../locators/checkoutPageLocator";
import { CheckoutPage } from "../pages/CheckoutPage";
import { checkoutData } from "../test-data/checkoutData";
import { error } from "node:console";

test.describe("", () => {
  let checkoutPage;
  let loginPage;
  let cartPage;
  let productPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    productPage = new ProductPage(page);

    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    await productPage.addFirstProductToCart();
    await productPage.clickOnCartLink();
  });

  test("Validate checkout elements", async ({ page }) => {
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await cartPage.clickCheckoutButton();
    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-one.html",
    );
    const checkoutElements = await checkoutPage.getCheckoutElements();

    expect(checkoutElements.cancel).toBeTruthy();
    expect(checkoutElements.continue).toBeTruthy();
    expect(checkoutElements.pageInfo).toBeTruthy();
  });

  test("Validate cancel button functionality", async ({ page }) => {
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await cartPage.clickCheckoutButton();
    await checkoutPage.clickCancel();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
  });

  test("Validate continue button functionality", async ({ page }) => {
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await cartPage.clickCheckoutButton();

    await checkoutPage.fillCheckoutInputDetails(
      checkoutData.fname,
      checkoutData.lname,
      checkoutData.pin,
    );
    await checkoutPage.clickContinue();
    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-two.html",
    );
  });

  test("Validate error message in Checkout form", async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await cartPage.clickCheckoutButton();
    await checkoutPage.clickContinue();

    const errMsg = await checkoutPage.getErrorMessage();

    expect(errMsg.trim()).toBe("Error: First Name is required");
  });
});
