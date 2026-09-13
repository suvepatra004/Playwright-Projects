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

  test.skip("Validate item total calculation", async ({ page }) => {
    const checkoutOverviewPage = new CheckoutPageOverview(page);

    const checkoutOverviewProducts =
      await checkoutOverviewPage.getCheckoutOverviewProducts();

    const calculatedTotalPrice = checkoutOverviewProducts.reduce(
      (sum, product) => {
        const price = parseFloat(
          String(product.price ?? "")
            .replace("$", "")
            .trim(),
        );

        return sum + (Number.isNaN(price) ? 0 : price);
      },
      0,
    );

    const itemTotalPrice = await checkoutOverviewPage.getItemTotalPrice();

    expect(itemTotalPrice).toBeCloseTo(calculatedTotalPrice, 2);
  });

  test("Validate Final Total price (ItemTotal + Tax)", async ({ page }) => {
    checkoutOverviewPage = new CheckoutPageOverview(page);

    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-two.html",
    );

    const itemTotal = await checkoutOverviewPage.getItemTotalPrice();
    const tax = await checkoutOverviewPage.getTax();
    const finalTotal = await checkoutOverviewPage.getFinalTotalPrice();

    expect(finalTotal).toBeLessThanOrEqual(itemTotal + tax);
  });
});
