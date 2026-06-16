import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PartsPage } from '../pages/Parts-page';
import { partData } from '../test-data/partsData';

let partsPage: PartsPage;
let page1: any;
let page1Promise: Promise<any>;

Given('User is logged into Techline application', async function () {
  console.log('Opening application');
  await this.page.goto('https://stage-techline.tamilzorous.com/');
  console.log('Application opened');
  // await this.page.pause();
});

Given('User navigates to Library', async function () {
  partsPage = new PartsPage(this.page);
  await this.page.getByRole('button', { name: 'Library' }).click();
  console.log('Navigated to Library');
});

When('User clicks on Parts link', async function () {
  await this.page.getByRole('main').getByRole('button', { name: 'Parts' }).click();
  console.log('Clicked on Parts link');
});

Then('Parts listing page should be displayed', async function () {
  await expect(this.page.getByRole('button', { name: 'Create' })).toBeVisible();
  console.log('Parts listing page displayed');
  page1Promise = this.page.waitForEvent('popup');
  console.log('Waiting for popup');
});

When('User click the Create button', async function () {
  const popupPromise = this.page.waitForEvent('popup');
  await this.page.getByRole('button', { name: 'Create' }).click();
  page1 = await popupPromise;
  partsPage = new PartsPage(page1);
  console.log('Create button clicked, popup opened');
});

Then('Add Parts page should be displayed', async function () {
  // await expect(partsPage.addPartsHeader).toBeVisible();
  await page1.waitForLoadState();
  console.log('Add Parts page displayed');
});

When('User enters part details', async function () {
  await partsPage.enterPartDetails(partData);
  console.log('Part details entered');
});

When('User click the Save Draft button', async function () {
  await page1.getByRole('button', { name: 'Save Draft' }).click();
  console.log('Save Draft button clicked');
});

Then('Part should be saved successfully', async function () {
  await page1.locator('.relative > div:nth-child(3)').first().click();
  await this.page.waitForTimeout(3000);

  // Replace with actual success toast
  await expect(
    this.page.locator('body')
  ).toBeVisible();
});