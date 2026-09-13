# Saucelabs Playwright Project

This project is a Playwright automation project for the SauceDemo website.

## Project purpose

- Automate login, product listing, cart, checkout, and checkout overview flows.
- Use page object model classes to separate page actions from test logic.
- Keep locators and test data in separate folders for easier maintenance.

## Project structure

- Pages folder contains page object classes such as LoginPage, ProductPage, CartPage, CheckoutPage, and CheckoutOverviewPage.
- Locators folder contains selector definitions for each page.
- Tests folder contains Playwright test files that validate the main user flows.
- Test data folder contains sample checkout and product data.
- Utils folder contains configuration values such as base URL and login credentials.

## Main workflows

- Login with a valid SauceDemo user.
- View and filter products on the inventory page.
- Add products to the cart.
- Open and validate the cart page.
- Fill checkout information and continue through checkout.
- Validate the checkout overview page before finishing the order.

## Notes

- The project uses Playwright and JavaScript files.
- The implemented tests focus on the main SauceDemo user journey from login to checkout overview.
- A downloadable PDF invoice flow is not implemented in the current workspace.
