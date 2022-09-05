import { expect, test } from '@playwright/test';

test('should navigation to the about page', async ({ page }) => {
	// Start from the index page
	await page.goto('http://localhost:3000/');
	// Find an element with the text 'About Page' and click on it
	await page.click('text=About');
	// The new url should be "/about"
	await expect(page).toHaveURL('http:localhost:3000/about');
	// The new page should contain an h1 with "About Page"
	await expect(page.locator('h1')).toContainText('About Page');
});
