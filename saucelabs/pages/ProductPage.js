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

  async filterProductsNameAtoZ() {
    // await this.page
    //   .locator(productPageSidebarLocator.filterDropDown)
    //   .click(productPageSidebarLocator.filterNamesAtoZ);

    await this.page.selectOption(
      productPageSidebarLocator.filterDropDown,
      "az",
    );
  }

  async filterProductsNameZtoA() {
    await this.page.selectOption(
      productPageSidebarLocator.filterDropDown,
      "za",
    );
  }

  async filterProductsPriceLowtoHigh() {
    await this.page.selectOption(
      productPageSidebarLocator.filterDropDown,
      "lohi",
    );
  }

  async filterProductsPriceHightoLow() {
    await this.page.selectOption(
      productPageSidebarLocator.filterDropDown,
      "hilo",
    );
  }

  async getAllProductNames() {
    return await this.page
      .locator(productPageSidebarLocator.productNames)
      .allTextContents();
  }

  async getAllProductPrices() {
    const prices = await this.page
      .locator(productPageSidebarLocator.productPrices)
      .allTextContents();

    return prices.map((price) => parseFloat(price.replace("$", "")));
  }

  async clickOnCartLink() {
    await this.page.locator(productPageSidebarLocator.cartLink).click();
  }

  async getFirstProductDetails() {
    const name = await this.page
      .locator(productPageSidebarLocator.productNames)
      .first()
      .textContent();
    const description = await this.page
      .locator(productPageSidebarLocator.productDesc)
      .first()
      .textContent();
    const price = await this.page
      .locator(productPageSidebarLocator.productPrices)
      .first()
      .textContent();

    return {
      name: name.trim(),
      description: description.trim(),
      price: price.trim(),
    };
  }

  async getAllProductDetails() {
    const allNames = await this.page
      .locator(productPageSidebarLocator.productNames)
      .allTextContents();
    const allDescription = await this.page
      .locator(productPageSidebarLocator.productDesc)
      .allTextContents();
    const allPrices = await this.page
      .locator(productPageSidebarLocator.productPrices)
      .allTextContents();

    const allProducts = allNames.map((_, i) => ({
      name: allNames[i].trim(),
      description: allDescription[i].trim(),
      price: allPrices[i].trim(),
    }));

    return allProducts;
  }

  async getSpecificProductDetails(specificProducts) {
    const allNames = await this.page
      .locator(productPageSidebarLocator.productNames)
      .allTextContents();
    const allDescription = await this.page
      .locator(productPageSidebarLocator.productDesc)
      .allTextContents();
    const allPrices = await this.page
      .locator(productPageSidebarLocator.productPrices)
      .allTextContents();

    const allProducts = allNames.map((_, i) => ({
      name: allNames[i].trim(),
      description: allDescription[i].trim(),
      price: allPrices[i].trim(),
    }));

    return allProducts.filter((p) => specificProducts.includes(p.name));
  }
}
