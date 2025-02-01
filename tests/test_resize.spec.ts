import { test, expect } from '@playwright/test';

test('resize using mouse drag', async ({ page, browserName }) => {
  await page.goto('http://localhost:5173/');

  await page.locator('img').first().click();

  await expect(page.locator('text=64 × 64')).toBeVisible();

  const bounds = await page.locator('div.nwse-resize').nth(1).boundingBox();

  expect(bounds).toBeTruthy();

  const mouseX = bounds!.x + bounds!.width / 2;
  const mouseY = bounds!.y + bounds!.height / 2;

  await page.locator('div.nwse-resize').nth(1).hover();
  await page.mouse.down();
  await page.mouse.move(mouseX+30, mouseY);
  await page.mouse.up();

  if (browserName === "webkit") {
    await page.locator('img').first().click();
  }

  await expect(page.locator('text=94 × 94')).toBeVisible();

  expect(await page.locator('img').first().getAttribute('width')).toBe('94');
});


