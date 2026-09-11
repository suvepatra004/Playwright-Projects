import { cartPageLocators } from "../locators/CartPageLocator";

export class CartPage {
  constructor(page) {
    this.page = page;
  }

  async getCartPageElements() {
    return {
      cartTitle: this.page.locator(cartPageLocators.cartTitle),
      shoppingCartBtn: this.page.locator(cartPageLocators.continueShoppingBtn),
      checkout: this.page.locator(cartPageLocators.checkoutBtn),
    };
  }

  async getAllCartProducts() {
    const allNames = await this.page
      .locator(cartPageLocators.productNames)
      .allTextContents();
    const allDescription = await this.page
      .locator(cartPageLocators.productDesc)
      .allTextContents();
    const allPrices = await this.page
      .locator(cartPageLocators.productPrices)
      .allTextContents();

    const allCartProducts = allNames.map((_, i) => ({
      name: allNames[i].trim(),
      description: allDescription[i].trim(),
      price: allPrices[i].trim(),
    }));

    return allCartProducts;
  }
}
