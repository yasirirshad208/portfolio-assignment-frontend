import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should redirect to signin when accessing protected route without authentication', async ({ page }) => {
    await page.goto('/');
    
    // Should be redirected to signin page
    await expect(page).toHaveURL(/.*signin/);
    await expect(page.locator('h2')).toContainText('Sign In');
  });

  test('should navigate to sign up page from sign in', async ({ page }) => {
    await page.goto('/signin');
    
    // Click on Sign Up link
    await page.getByRole('link', { name: /sign up/i }).click();
    
    // Should be on sign up page
    await expect(page).toHaveURL(/.*signup/);
    await expect(page.locator('h2')).toContainText('Sign Up');
  });

  test('should navigate to sign in page from sign up', async ({ page }) => {
    await page.goto('/signup');
    
    // Click on Sign In link
    await page.getByRole('link', { name: /sign in/i }).click();
    
    // Should be on sign in page
    await expect(page).toHaveURL(/.*signin/);
    await expect(page.locator('h2')).toContainText('Sign In');
  });

  test('should display sign up form with all required fields', async ({ page }) => {
    await page.goto('/signup');
    
    // Check form fields
    await expect(page.locator('input[placeholder="Name"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign up/i })).toBeVisible();
    
    // Check required attributes
    const nameInput = page.locator('input[placeholder="Name"]');
    const emailInput = page.locator('input[placeholder="Email"]');
    const passwordInput = page.locator('input[placeholder="Password"]');
    
    await expect(nameInput).toHaveAttribute('required', '');
    await expect(emailInput).toHaveAttribute('required', '');
    await expect(passwordInput).toHaveAttribute('required', '');
  });

  test('should display sign in form with all required fields', async ({ page }) => {
    await page.goto('/signin');
    
    // Check form fields
    await expect(page.locator('input[placeholder="Email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
    
    // Check required attributes
    const emailInput = page.locator('input[placeholder="Email"]');
    const passwordInput = page.locator('input[placeholder="Password"]');
    
    await expect(emailInput).toHaveAttribute('required', '');
    await expect(passwordInput).toHaveAttribute('required', '');
  });

  test('should allow user to type in sign up form fields', async ({ page }) => {
    await page.goto('/signup');
    
    await page.locator('input[placeholder="Name"]').fill('Test User');
    await page.locator('input[placeholder="Email"]').fill('test@example.com');
    await page.locator('input[placeholder="Password"]').fill('password123');
    
    // Verify values
    await expect(page.locator('input[placeholder="Name"]')).toHaveValue('Test User');
    await expect(page.locator('input[placeholder="Email"]')).toHaveValue('test@example.com');
    await expect(page.locator('input[placeholder="Password"]')).toHaveValue('password123');
  });

  test('should allow user to type in sign in form fields', async ({ page }) => {
    await page.goto('/signin');
    
    await page.locator('input[placeholder="Email"]').fill('test@example.com');
    await page.locator('input[placeholder="Password"]').fill('password123');
    
    // Verify values
    await expect(page.locator('input[placeholder="Email"]')).toHaveValue('test@example.com');
    await expect(page.locator('input[placeholder="Password"]')).toHaveValue('password123');
  });
});

