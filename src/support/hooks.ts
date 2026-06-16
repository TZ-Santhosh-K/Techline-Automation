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
  // await this.page.goto('https://stage-techline.tamilzorous.com/');
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});