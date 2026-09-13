import { checkoutPageLocator } from "../locators/checkoutPageLocator";

export class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async fillCheckoutInputDetails(details) {
    await this.page.locator(checkoutPageLocator.firstName).fill(details.fname);
    await this.page.locator(checkoutPageLocator.lastName).fill(details.lname);
    await this.page.locator(checkoutPageLocator.postalCode).fill(details.pin);
  }
}
