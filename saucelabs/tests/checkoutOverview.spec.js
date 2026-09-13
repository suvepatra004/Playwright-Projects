import { test, expect } from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig";
import { CartPage } from "../pages/CartPage";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { checkoutData } from "../test-data/checkoutData";
import { checkoutPageLocator } from "../locators/checkoutPageLocator";
import { CheckoutPageOverview } from "../pages/CheckoutOverviewPage";

test.describe("Checkout Overview Page Validation", () => {
  let cartPage;
  let checkoutOverviewPage;
  let loginPage;
  let checkoutPage;
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
    await cartPage.clickCheckoutButton();

    await checkoutPage.fillCheckoutInputDetails(
      checkoutData.fname,
      checkoutData.lname,
      checkoutData.pin,
    );
    await checkoutPage.clickContinue();
  });

  test("Validating checkout overview page elements", async ({ page }) => {
    checkoutOverviewPage = new CheckoutPageOverview(page);

    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-two.html",
    );
    const checkoutOverviewElements =
      checkoutOverviewPage.getCheckoutOverviewPageElements();

    await expect(checkoutOverviewElements.cancelBtn).toBeVisible();
    await expect(checkoutOverviewElements.finishBtn).toBeVisible();
    await expect(checkoutOverviewElements.pageInfo).toBeVisible();
  });

  test("Validate Cancel button functionality", async ({ page }) => {
    checkoutOverviewPage = new CheckoutPageOverview(page);

    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-two.html",
    );

    await checkoutOverviewPage.clickCancel();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });
});
