import { checkoutOverviewLocator } from "../locators/CheckoutOverviewLocator";

export class CheckoutPageOverview {
  constructor(page) {
    this.page = page;
  }

  getCheckoutOverviewPageElements() {
    return {
      pageInfo: this.page.locator(checkoutOverviewLocator.title),
      cancelBtn: this.page.locator(checkoutOverviewLocator.cancelBtn),
      finishBtn: this.page.locator(checkoutOverviewLocator.finishBtn),
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
    // single price value i.e Item Total Price
    const priceText = await this.page
      .locator(checkoutOverviewLocator.itemPrice)
      .textContent();

    return parseFloat(priceText.replace("Item total: $", "").trim());
  }

  async getTax() {
    const taxText = await this.page
      .locator(checkoutOverviewLocator.tax)
      .textContent();

    return parseFloat(taxText.replace("Tax: $", "").trim());
  }

  async getFinalTotalPrice() {
    const totalText = await this.page
      .locator(checkoutOverviewLocator.total)
      .textContent();

    return parseFloat(totalText.replace("Total: $", "").trim());
  }

  async clickCancel() {
    await this.page.locator(checkoutOverviewLocator.cancelBtn).click();
  }

  async clickFinish() {
    await this.page.locator(checkoutOverviewLocator.finishBtn).click();
  }
}
