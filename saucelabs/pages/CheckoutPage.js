import { checkoutPageLocator } from "../locators/checkoutPageLocator";

export class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async fillCheckoutInputDetails(fname, lname, pin) {
    await this.page.fill(checkoutPageLocator.firstName, fname);
    await this.page.fill(checkoutPageLocator.lastName, lname);
    await this.page.fill(checkoutPageLocator.postalCode, pin);
  }

  async getCheckoutElements() {
    return {
      pageInfo: checkoutPageLocator.pageInfo,
      cancel: checkoutPageLocator.cancelBtn,
      continue: checkoutPageLocator.continueBtn,
    };
  }

  async clickCancel() {
    await this.page.locator(checkoutPageLocator.cancelBtn).click();
  }

  async clickContinue() {
    await this.page.locator(checkoutPageLocator.continueBtn).click();
  }

  async getErrorMessage() {
    return this.page
      .locator(checkoutPageLocator.errorMessageContainer)
      .textContent();
  }
}
