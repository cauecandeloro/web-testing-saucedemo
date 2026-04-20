# Web Testing - Sauce Demo

E2E test suite for the [Sauce Demo](https://www.saucedemo.com) web application using Playwright.

---

## About the Project

Sauce Demo is a web e-commerce application built for testing purposes. This project covers the main user flows with automated end-to-end tests, running across three browsers on every push via GitHub Actions.

## Tech Stack

- [Playwright](https://playwright.dev/) — E2E testing framework
- TypeScript
- GitHub Actions — CI/CD pipeline

## Test Coverage

| Module | Scenarios |
|---|---|
| Login | Valid credentials, invalid credentials, empty fields |
| Cart | Add product, remove product, cart badge update, add multiple products |
| Checkout | Complete checkout, empty first name, empty last name, empty postal code, order summary |

## Project Structure

web-testing-saucedemo/
├── tests/
│   └── login.spec.ts
│   └── cart.spec.ts
│   └── checkout.spec.ts
├── .github/
│   └── workflows/
│       └── playwright.yml
├── playwright.config.ts
└── package.json

## How to Run Locally

**Prerequisites:** Node.js 24+

```bash
# Clone the repository
git clone https://github.com/cauecandeloro/web-testing-saucedemo.git
cd web-testing-saucedemo

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npx playwright test

# Run tests in a specific browser
npx playwright test --project=chromium

# Open HTML report
npx playwright show-report
```

## CI/CD

Tests run automatically on every push and pull request via GitHub Actions across Chromium, Firefox and WebKit.