#### Testing Website: saucedemo.com

#### Usernames

```
standard_user
locked_out_user
problem_user
performance_glitch_user
error_user
visual_user
```

#### Password

```
secret_sauce
```

---

#### Project overview

This project is a Playwright automation suite for the SauceDemo website. It tests the main e-commerce flow using the Page Object Model, where each page has its own class and locator file.

---

#### Pages covered in the project

```
- Login Page
- Inventory / Product List Page
- Product Detail Page
- Cart Page
- Sidebar Menu
- Checkout Page
- Checkout Overview Page
- Final Page / Order Confirmation Page
```

---

### Current project status

The Saucelabs project currently includes automation for the main user journey from login to final order confirmation.

The main test files in the project are:

```
- cartPage.spec.js
- checkoutPage.spec.js
- checkoutOverview.spec.js
- finalPage.spec.js
- productPage.spec.js
- saucedemo.spec.js
- example.spec.js
```

The main page object files are:

```
- LoginPage.js
- ProductPage.js
- CartPage.js
- CheckoutPage.js
- CheckoutOverviewPage.js
- FinalPage.js
```

The locator files are:

```
- LoginLocators.js
- ProductPageLocator.js
- CartPageLocator.js
- CheckoutPageLocator.js
- CheckoutOverviewLocator.js
- FinalPageLocator.js
```

---

### Implemented actions

#### 1. Login flow

```
- Enter username and password
- Click login
- Verify the user lands on the inventory page
```

#### 2. Inventory / product flow

```
- Validate products are displayed
- Add a single product to cart
- Add all products to cart
- Add specific products to cart
- Open cart from the cart icon
- Filter products by A-Z, Z-A, low-high, and high-low
- Use sidebar actions such as About, Logout, and Reset App State
```

#### 3. Cart flow

```
- Read cart page elements
- Get product details from cart
- Remove the first product
- Continue shopping
- Go to checkout
```

#### 4. Checkout flow

```
- Enter first name, last name, and postal code
- Continue to the next step
- Cancel checkout
- Read validation errors for missing fields
```

#### 5. Checkout overview flow

```
- Validate overview page elements
- Read products, item total, tax, and total values
- Cancel checkout
- Finish checkout
```

#### 6. Final page / order confirmation flow

```
- Reach the order confirmation page after finishing checkout
- Validate page title, success message, and action buttons
- Check that the Back Home button is visible and works
- Validate the presence of the Generate PDF button
- Confirm the success message: Thank you for your order!
- Redirect back to the inventory page from the Back Home button
```

---

### Overall summary

This project covers the full purchase flow in SauceDemo, starting from login and ending at the final order confirmation page.

The structure is organized with reusable page objects and locators, which makes the tests easier to maintain and extend.

The current project scope includes the final confirmation page, but the downloadable PDF invoice feature is still partially handled and is not fully developed as a complete assertion flow.
