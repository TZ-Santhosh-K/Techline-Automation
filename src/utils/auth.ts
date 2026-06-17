import { chromium } from '@playwright/test';

async function saveAuth() {
  const browser = await chromium.launch({
    headless: false
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://stage-techline.tamilzorous.com/');

  console.log('Login manually and press Resume');

  await page.pause();

  console.log('Current URL:', page.url());

  await page.waitForTimeout(5000);

  await context.storageState({
    path: 'auth.json'
  });

  console.log('Auth file saved');

  await browser.close();
}

saveAuth();