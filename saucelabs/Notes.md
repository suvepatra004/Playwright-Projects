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

#### Pages currently implemented in the Saucelabs project

```
- Login Page
- Product Lists / Inventory Page
- Product Page
- Cart Page
- Sidebar menu (All Items, About, Logout, Reset App State)
- Checkout Page
- Checkout Overview Page
```

---

### Current project status

The saucedemo Playwright project currently uses page objects and locators for the main login, product, cart, checkout, and checkout overview flows.

The implemented test files in the workspace are:

```
- cartPage.spec.js
- checkoutPage.spec.js
- checkoutOverview.spec.js
- productPage.spec.js
- saucedemo.spec.js
```

The current page object files are:

```
- LoginPage.js
- ProductPage.js
- CartPage.js
- CheckoutPage.js
- CheckoutOverviewPage.js
```

### Implemented actions

#### 1. Login Page

```
- Enter username and password
- Click the login button
- Validate that the user reaches the inventory page
```

#### 2. Product / Inventory Page

```
- Validate that product names, descriptions, prices, and add-to-cart buttons are shown
- Add the first product, all products, or specific products to the cart
- Open the cart page from the cart icon
- Filter products by name A-Z, Z-A, price low-high, and price high-low
- Open the sidebar menu and use About, Logout, and Reset App State options
```

#### 3. Product Page

```
- Add a product to the cart
- Open the cart link
- Use product details helpers for the first product and all products
```

#### 4. Cart Page

```
- Read cart elements such as title, continue shopping button, and checkout button
- Get all products in the cart from the page
- Remove the first product from the cart
- Click checkout and continue shopping
```

#### 5. Checkout Page

```
- Fill first name, last name, and postal code
- Click continue or cancel
- Read error messages for missing checkout form data
```

#### 6. Checkout Overview Page

```
- Validate page title, cancel button, and finish button
- Read product details from checkout overview
- Read item total, tax, and total values
- Click cancel or finish
```

The project currently covers the main SauceDemo flow from login to checkout and checkout overview. The PDF invoice download flow is not represented in the implemented page objects or tests.
