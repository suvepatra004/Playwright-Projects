import { finalPageLocators } from "../locators/FinalPageLocator";

export class FinalPage {
  constructor(page) {
    this.page = page;
  }

  async getFinalPageElements() {
    return {
      pageInfo: this.page.locator(finalPageLocators.pageInfo),
      backHomeBtn: this.page.locator(finalPageLocators.backHomeBtn),
      generatePdfBtn: this.page.locator(finalPageLocators.generatePdfBtn),
    };
  }

  async getPurchaseSuccessMsg() {
    return this.page.locator(finalPageLocators.successMsg);
  }

  async clickOnBackHomeBtn() {
    await this.page.locator(finalPageLocators.backHomeBtn).click();
  }
}
