import { Before, After,setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';

setDefaultTimeout(60000);

Before(async function () {
  this.browser = await chromium.launch({
    headless: false
  });

   this.context = await this.browser.newContext({
    storageState: 'auth.json'
  });

  this.page = await this.context.newPage();
  
  // Set a viewport for consistency
  await this.page.setViewportSize({ width: 1280, height: 720 });
  
  await this.page.goto('https://stage-techline.tamilzorous.com/', { waitUntil: 'networkidle' });
  
  console.log(
    'Token:',
    await this.page.evaluate(() => localStorage.getItem('token'))
  );
  
console.log(
  'User:',
  await this.page.evaluate(() => localStorage.getItem('user'))
);

  console.log('URL:', await this.page.url());
});

After(async function () {
  if (this.browser) {
    this.page.on('close', () => {
   console.log('PAGE CLOSED');
});

this.browser.on('disconnected', () => {
   console.log('BROWSER CLOSED');
});
    await this.browser.close();
  }
});