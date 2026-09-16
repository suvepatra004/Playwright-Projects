# Saucelabs Playwright Project

This project is a Playwright automation project for the SauceDemo website. It covers the main purchase flow from login to final order confirmation using the Page Object Model.

## Project purpose

- Automate the SauceDemo login process.
- Validate inventory and product actions.
- Test cart operations and checkout steps.
- Validate the checkout overview page and final confirmation page.
- Keep page logic, locators, and test data organized in separate folders.

## Project structure

- Pages folder contains page object classes for login, products, cart, checkout, checkout overview, and final confirmation.
- Locators folder contains CSS selector definitions for each page.
- Tests folder contains Playwright tests for the main user flows.
- Test-data folder contains sample checkout and product-related test data.
- Utils folder contains environment configuration such as base URL and login credentials.

## Main workflows covered

- Login with a valid user.
- View and validate products on the inventory page.
- Add products to the cart.
- Open the cart and validate cart items.
- Continue shopping and go to checkout.
- Fill customer details in the checkout form.
- Validate the checkout overview details.
- Finish checkout and reach the final page.
- Validate the success message and Back Home action.

## Current pages implemented

- Login Page
- Inventory / Product List Page
- Product Page
- Cart Page
- Sidebar Menu
- Checkout Page
- Checkout Overview Page
- Final Page / Order Confirmation Page

## Current test files

- cartPage.spec.js
- checkoutPage.spec.js
- checkoutOverview.spec.js
- finalPage.spec.js
- productPage.spec.js
- saucedemo.spec.js
- example.spec.js

## Current page object files

- LoginPage.js
- ProductPage.js
- CartPage.js
- CheckoutPage.js
- CheckoutOverviewPage.js
- FinalPage.js

## Notes

- The project uses Playwright with JavaScript files.
- The current automation covers the main SauceDemo purchase journey from login to final confirmation.
- The PDF invoice download flow is not fully implemented in the current workspace.
