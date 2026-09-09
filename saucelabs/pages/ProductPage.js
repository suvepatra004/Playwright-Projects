import { productPageSidebarLocator } from "../locators/ProductPageLocator";

export class ProductPage {
  constructor(page) {
    this.page = page;
  }
  async logout() {
    // open manu sidebar & click on logout
    await this.page.click(productPageSidebarLocator.menuSidebarOpen);
    await this.page.click(productPageSidebarLocator.logoutLink);
  }

  async openAboutPage() {
    await this.page.click(productPageSidebarLocator.menuSidebarOpen);
    await this.page.click(productPageSidebarLocator.aboutLink);
  }

  async validateAllProductDisplayed() {
    const names = await this.page
      .locator(productPageSidebarLocator.productNames)
      .allTextContents();
    const descriptions = await this.page
      .locator(productPageSidebarLocator.productDesc)
      .allTextContents();
    const prices = await this.page
      .locator(productPageSidebarLocator.productPrices)
      .allTextContents();
    const buttonCount = await this.page
      .locator(productPageSidebarLocator.addToCartBtns)
      .count();

    if (names.length === 0) {
      throw new Error("No Products Found");
    }

    if (
      names.length !== descriptions.length ||
      names.length !== prices.length ||
      names.length !== buttonCount
    ) {
      throw new Error("Mismatch between the product details");
    }
  }

  async addFirstProductToCart() {
    await this.page
      .locator(productPageSidebarLocator.addToCartBtns)
      .first()
      .click();
  }

  async addAllProductsToCart() {
    const buttons = this.page.locator(productPageSidebarLocator.addToCartBtns);

    while ((await buttons.count()) > 0) {
      await buttons.first().click();
      await this.page.waitForTimeout(2000);
    }
  }

  async addSpecificProductsToCart(productNames) {
    const productCards = await this.page.locator(
      productPageSidebarLocator.productCards,
    );

    for (const productName of productNames) {
      const productCard = productCards.filter({
        has: this.page.getByText(productName, { exact: true }),
      });

      await productCard
        .locator(productPageSidebarLocator.addToCartBtns)
        .click();

      await this.page.waitForTimeout(2000);
    }
  }
}
