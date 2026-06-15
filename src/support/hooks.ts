import { Before, After,setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';

setDefaultTimeout(60000);

Before(async function () {
  this.browser = await chromium.launch({
    headless: false
  });

   this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  await this.page.goto('https://stage-techline.tamilzorous.com/');

  await this.page.evaluate((token) => {
    localStorage.setItem('authToken', token);
  }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiRnd4MlNGaXR6ckxrRjdFX20zZmU2NGpBV1pYQUdTVl9Sc0FxUWJHRmJBV19kR1RnMjBOY092R0NEcUpzTGpLQjNjbXRWdU9PMlpJbU5vemFuRm1mSk9peWlacndtTFg3eXJHR01KUV90ekIzaWduRVBtV0VaaWs1b21mU3lQSXQ4SmNqTWNQY1lTSnU3RWNhYXlWSGpzcFI1R0tMRkRXSGU4ZHZ2Wm51dm0yQ0NyWkFJb2ZOV1VUdXByb1RLR1MzV3JhQ2M0UkEiLCJpYXQiOjE3ODE1NDczNDUsImV4cCI6MTc4MTU0OTE0NX0.5_b9tQ8VlL_Diox3DtQ6QS9ycC6yCzzr9KPA2Ym6C2g');
    await this.page.reload();

});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});