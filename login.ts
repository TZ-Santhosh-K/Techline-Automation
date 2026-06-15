import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({
    headless: false
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://stage-techline.tamilzorous.com/');

  await page.fill('input[type="tel"]', '9751989694');
  await page.click('button[type="submit"]');

  console.log('Enter OTP and login manually');

  await page.pause();

  // await context.storageState({
  //   path: 'storageState.json'
  // });

  await browser.close();
})();