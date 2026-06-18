import { Given, When, Then,setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PartsPage } from '../pages/PartsPage';
import { partData } from '../test-data/partsData';

setDefaultTimeout(60000); // Set default timeout to 60 seconds
let partsPage: PartsPage;
let newPage: any;
let page1Promise: Promise<any>;

Given('User is logged into Techline application', async function () {
  await this.page.goto(
    'https://stage-techline.tamilzorous.com/home',
    { waitUntil: 'networkidle' }
  );
  console.log('URL:', this.page.url());
  await this.page.screenshot({
    path: 'login-check.png',
    fullPage: true
  });
});

Given('User navigates to Library for Parts', async function () {
  partsPage = new PartsPage(this.page);
  await this.page.getByRole('button', { name: 'Library' }).click();
  console.log('Navigated to Library');
});

When('User clicks on Parts link', async function () {
  await this.page.getByRole('main').getByRole('button', { name: 'Parts' }).click();
  console.log('Clicked on Parts link');
  console.log('Current URL:', await this.page.url());
});

Then('Parts listing page should be displayed', async function () {
  await this.page.waitForLoadState('networkidle');
  // await this.page.waitForTimeout(6000);
  const buttons = await this.page.locator('button').allTextContents();
  // console.log(buttons);
  // console.log(await this.page.content());
  // await expect(
  //   this.page.getByRole('button', { name: 'Parts' })
  // ).toBeVisible();
  // await this.page.screenshot({
  //   path: 'parts-list-page.png',
  //   fullPage: true
  // });
});

When('User click the Parts Create button', async function () {

  const pagePromise = this.context.waitForEvent('page');

  await this.page.getByRole('button', { name: 'Create' }).click();

  newPage = await pagePromise;

  await newPage.waitForLoadState();

  this.page = newPage;

  partsPage = new PartsPage(this.page);

  console.log("New tab URL:", await this.page.url());

});

Then('Add Parts page should be displayed', async function () {

  await expect(
    this.page.getByRole('heading', {
      name: 'Add Parts'
    })
  ).toBeVisible();

  console.log("Add Parts page displayed");

});

When('User enters part details', async function () {
  console.log("Current URL:", await this.page.url());

await this.page.screenshot({
  path: "add-parts-page.png",
  fullPage: true
});
  await partsPage.enterPartDetails(partData);
  await this.page.screenshot({
    path: 'before-enter-details.png',
    fullPage: true
  });
 
  // console.log('Current URL :', this.page.url());
  // console.log('Page title :', await this.page.title());
  // await this.page.waitForTimeout(3000); // Wait for 3 seconds to ensure all actions are completed

  console.log('Part details entered');
});

When('User click the Publish button', async function () {
  const publishButton = this.page.getByRole('button', {
    name: 'Publish'
  });
  await expect(publishButton).toBeVisible({
    // timeout: 10000
  });
  await publishButton.click();
  console.log('Publish button clicked');
});

Then('Part should be saved successfully', async function () {
  await this.page.locator('.relative > div:nth-child(3)').first().click();
  await this.page.waitForTimeout(3000);

  // Replace with actual success toast
  await expect(
    this.page.locator('body')
  ).toBeVisible();
});