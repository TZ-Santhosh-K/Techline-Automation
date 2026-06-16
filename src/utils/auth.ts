import { chromium } from '@playwright/test';

async function saveAuth() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://stage-techline.tamilzorous.com/');

  await page.pause(); // login manually

  await page.context().storageState({
    path: 'auth.json'
  });

  await browser.close();


saveAuth();