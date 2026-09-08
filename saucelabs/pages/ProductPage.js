import { productPageSidebarLocator } from "../locators/ProductPageLocator";

export class ProductPage {
  constructor(page) {
    this.page = page;
  }
  async logout() {
    // open manu sidebar
    // click on logout
    await this.page.click(productPageSidebarLocator.menuSidebarOpen);
    await this.page.click(productPageSidebarLocator.logoutLink);
  }

  async openAboutPage() {
    
  }
}
