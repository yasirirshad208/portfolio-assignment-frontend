# E2E Testing with Playwright

This directory contains End-to-End (E2E) tests for the application using Playwright.

## Setup

First, install Playwright and its browsers:

```bash
cd frontend
npm install --save-dev @playwright/test
npx playwright install
```

## Running Tests

### Run all E2E tests:
```bash
npm run test:e2e
```

### Run tests in UI mode (interactive):
```bash
npm run test:e2e:ui
```

### Run tests in headed mode (see browser):
```bash
npm run test:e2e:headed
```

### Run tests in debug mode:
```bash
npm run test:e2e:debug
```

## Test Files

- **auth.spec.js** - Tests for authentication flows (sign in, sign up, navigation)
- **dashboard.spec.js** - Tests for dashboard and navigation between pages
- **contact-form.spec.js** - Tests for contact form functionality

## Test Coverage

### Authentication Tests:
- Redirect to signin when accessing protected routes without auth
- Navigation between sign in and sign up pages
- Form field validation and input handling
- Required field checks

### Dashboard Tests:
- Dashboard display after authentication
- Navigation cards visibility
- Navigation to Contacts, Education, and Projects pages
- Sign out functionality

### Contact Form Tests:
- Form field display and validation
- Form input handling
- Form submission with API mocking
- Required field validation

## Configuration

The Playwright configuration is in `playwright.config.js`. It:
- Automatically starts the dev server before tests
- Runs tests on Chromium, Firefox, and WebKit
- Uses base URL: http://localhost:5173
- Generates HTML reports on failure

## Notes

- Tests use mocked API responses for reliability
- Authentication is simulated using localStorage tokens
- The dev server must be available or will be started automatically

