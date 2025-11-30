import { test, expect } from '@playwright/test';

test.describe('Dashboard and Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication by setting token in localStorage
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('token', 'mock-token-for-testing');
    });
  });

  test('should display dashboard after authentication', async ({ page }) => {
    // Mock successful API response for user info
    await page.route('**/auth/signin', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          token: 'mock-token',
          user: { id: '1', email: 'test@example.com', name: 'Test User' }
        })
      });
    });

    await page.goto('/signin');
    await page.locator('input[placeholder="Email"]').fill('test@example.com');
    await page.locator('input[placeholder="Password"]').fill('password123');
    await page.getByRole('button', { name: /sign in/i }).click();

    // Wait for navigation to dashboard
    await page.waitForURL('/');
    
    // Check dashboard elements
    await expect(page.locator('h1')).toContainText('Portfolio Dashboard');
    await expect(page.getByRole('button', { name: /sign out/i })).toBeVisible();
  });

  test('should display dashboard navigation cards', async ({ page }) => {
    // Set token and mock user
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('token', 'mock-token');
    });

    // Mock API calls
    await page.route('**/api/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });

    await page.reload();
    
    // Check navigation cards
    await expect(page.getByRole('link', { name: /contacts/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /education/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /projects/i })).toBeVisible();
  });

  test('should navigate to contacts page', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('token', 'mock-token');
    });

    // Mock API calls
    await page.route('**/api/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });

    await page.reload();
    
    // Click on Contacts link
    await page.getByRole('link', { name: /contacts/i }).click();
    
    // Should navigate to contacts page
    await expect(page).toHaveURL(/.*contacts/);
  });

  test('should navigate to education page', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('token', 'mock-token');
    });

    // Mock API calls
    await page.route('**/api/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });

    await page.reload();
    
    // Click on Education link
    await page.getByRole('link', { name: /education/i }).click();
    
    // Should navigate to education page
    await expect(page).toHaveURL(/.*educations/);
  });

  test('should navigate to projects page', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('token', 'mock-token');
    });

    // Mock API calls
    await page.route('**/api/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });

    await page.reload();
    
    // Click on Projects link
    await page.getByRole('link', { name: /projects/i }).click();
    
    // Should navigate to projects page
    await expect(page).toHaveURL(/.*projects/);
  });

  test('should sign out and redirect to signin', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('token', 'mock-token');
    });

    // Mock API calls
    await page.route('**/api/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });

    await page.reload();
    
    // Click sign out button
    await page.getByRole('button', { name: /sign out/i }).click();
    
    // Should redirect to signin
    await expect(page).toHaveURL(/.*signin/);
    
    // Token should be removed
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeNull();
  });
});

