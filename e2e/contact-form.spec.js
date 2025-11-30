import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    // Set authentication token
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('token', 'mock-token');
    });
  });

  test('should display contact form with all fields', async ({ page }) => {
    // Mock API calls
    await page.route('**/api/contacts', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });

    await page.goto('/contacts');
    
    // Check form fields
    await expect(page.locator('input[placeholder="Name"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Email"]')).toBeVisible();
    await expect(page.locator('textarea[placeholder="Message"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /submit/i })).toBeVisible();
  });

  test('should allow user to fill contact form', async ({ page }) => {
    // Mock API calls
    await page.route('**/api/contacts', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });

    await page.goto('/contacts');
    
    // Fill form fields
    await page.locator('input[placeholder="Name"]').fill('John Doe');
    await page.locator('input[placeholder="Email"]').fill('john@example.com');
    await page.locator('textarea[placeholder="Message"]').fill('Test message');
    
    // Verify values
    await expect(page.locator('input[placeholder="Name"]')).toHaveValue('John Doe');
    await expect(page.locator('input[placeholder="Email"]')).toHaveValue('john@example.com');
    await expect(page.locator('textarea[placeholder="Message"]')).toHaveValue('Test message');
  });

  test('should submit contact form successfully', async ({ page }) => {
    let requestData = null;
    
    // Mock API call and capture request
    await page.route('**/api/contacts', route => {
      if (route.request().method() === 'POST') {
        requestData = route.request().postDataJSON();
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true })
        });
      } else {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([])
        });
      }
    });

    await page.goto('/contacts');
    
    // Fill and submit form
    await page.locator('input[placeholder="Name"]').fill('John Doe');
    await page.locator('input[placeholder="Email"]').fill('john@example.com');
    await page.locator('textarea[placeholder="Message"]').fill('Test message');
    await page.getByRole('button', { name: /submit/i }).click();
    
    // Wait for request to be made
    await page.waitForTimeout(500);
    
    // Verify request was made with correct data
    expect(requestData).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    });
  });

  test('should require all contact form fields', async ({ page }) => {
    // Mock API calls
    await page.route('**/api/contacts', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });

    await page.goto('/contacts');
    
    // Check required attributes
    const nameInput = page.locator('input[placeholder="Name"]');
    const emailInput = page.locator('input[placeholder="Email"]');
    const messageInput = page.locator('textarea[placeholder="Message"]');
    
    await expect(nameInput).toHaveAttribute('required', '');
    await expect(emailInput).toHaveAttribute('required', '');
    await expect(messageInput).toHaveAttribute('required', '');
  });
});

