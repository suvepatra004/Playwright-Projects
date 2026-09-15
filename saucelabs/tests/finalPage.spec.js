import { test, expect } from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig";
import { LoginPage } from "../pages/LoginPage";
import { checkoutData } from "../test-data/checkoutData";
import { CheckoutPage } from "../pages/CheckoutPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { checkoutPageLocator } from "../locators/checkoutPageLocator";
import { CheckoutPageOverview } from "../pages/CheckoutOverviewPage";
import { FinalPage } from "../pages/FinalPage";
import { finalPageLocators } from "../locators/FinalPageLocator";

test.describe("Final Page Validation", () => {
  let finalPage;
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
    finalPage = new FinalPage(page);
    checkoutOverviewPage = new CheckoutPageOverview(page);

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

    await checkoutOverviewPage.clickFinish();
  });

  test("Validate Final Page elements", async ({ page }) => {
    finalPage = new FinalPage(page);

    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-complete.html",
    );

    const { pageInfo, backHomeBtn, generatePdfBtn } =
      await finalPage.getFinalPageElements();
    await page.waitForTimeout(3000);

    await expect(pageInfo).toBeVisible();
    await expect(backHomeBtn).toBeVisible();
    await expect(generatePdfBtn).toBeVisible();

    await page.waitForTimeout(1000);
  });

  test("Validate the Success Message", async ({ page }) => {
    finalPage = new FinalPage(page);

    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-complete.html",
    );

    const message = await finalPage.getPurchaseSuccessMsg();
    await expect(message).toHaveText("Thank you for your order!");
  });

  test("Validate the Back Home Button", async ({ page }) => {
    finalPage = new FinalPage(page);

    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-complete.html",
    );

    await finalPage.clickOnBackHomeBtn();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Validate Downloaded Invoice PDF", () => {});
});
