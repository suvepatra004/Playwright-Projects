import { test, expect } from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig";
import { ProductPage } from "../pages/ProductPage";
import { LoginPage } from "../pages/LoginPage";
import { LoginLocators } from "../locators/LoginLocators";

test.describe("Product Validation Page", () => {
  let loginPage;
  let productPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Logout from Product Page", async ({ page }) => {
    productPage = new ProductPage(page);

    await productPage.logout();
    // await expect(page.getByRole("button", { name: /login-button/ }));
    await expect(page.locator(LoginLocators.loginButton));
  });
});
