import { checkoutOverviewLocator } from "../locators/CheckoutOverviewLocator";

export class CheckoutPageOverview {
  constructor(page) {
    this.page = page;
  }

  async getCheckoutOverviewPageElements() {
    return {
      pageInfo: checkoutOverviewLocator.title,
      cancelBtn: checkoutOverviewLocator.cancelBtn,
      finishBtn: checkoutOverviewLocator.finishBtn,
    };
  }

  async getCheckoutOverviewProducts() {
    const allNames = await this.page
      .locator(checkoutOverviewLocator.productNames)
      .allTextContents();
    const allDescription = await this.page
      .locator(checkoutOverviewLocator.productDesc)
      .allTextContents();
    const allPrices = await this.page
      .locator(checkoutOverviewLocator.productPrices)
      .allTextContents();

    const allCheckoutOverviewProducts = allNames.map((_, i) => ({
      name: allNames[i].trim(),
      description: allDescription[i].trim(),
      price: allPrices[i].trim(),
    }));

    return allCheckoutOverviewProducts;
  }

  async getItemTotalPrice() {
    const priceText = await this.page
      .locator(checkoutOverviewLocator.itemPrice)
      .allTextContents();
    return priceText.replace("Item total: $", "").trim();
  }

  async getTax() {
    const priceText = await this.page
      .locator(checkoutOverviewLocator.tax)
      .allTextContents();
    return priceText.replace("Tax: $", "").trim();
  }

  async getTotalPrice() {
    const priceText = await this.page
      .locator(checkoutOverviewLocator.total)
      .allTextContents();
    return priceText.replace("Total: $", "").trim();
  }

  async clickCancel() {
    await this.page.locator(checkoutOverviewLocator.cancelBtn).click();
  }

  async clickFinish() {
    await this.page.locator(checkoutOverviewLocator.finishBtn).click();
  }
}
