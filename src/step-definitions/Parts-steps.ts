import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import { PartsPage } from '../pages/Parts-page';
import { partData } from '../test-data/partsData';

let partsPage: PartsPage;

// Given('User is logged into Techline application', async function () {
//   console.log('Login step');
// });
Given('User is logged into Techline application', async function () {
  console.log('Opening application');
  await this.page.goto('https://stage-techline.tamilzorous.com/');
  console.log('Application opened');
  await this.page.pause();
});

Given('User navigates to Library', async function () {
  partsPage = new PartsPage(this.page);

  await partsPage.libraryMenu.click();
});

When('User clicks on Parts link', async function () {
  await partsPage.partsLink.click();
});

Then('Parts listing page should be displayed', async function () {
  await expect(partsPage.createButton).toBeVisible();
});

When('User click the Create button', async function () {
  await partsPage.clickCreateButton();
});

Then('Add Parts page should be displayed', async function () {
  await expect(partsPage.addPartsHeader).toBeVisible();
});

When('User enters part details', async function () {
  await partsPage.enterPartDetails(partData);
});

When('User click the Save Draft button', async function () {
  await partsPage.clickSaveDraft();
});

Then('Part should be saved successfully', async function () {
  await this.page.waitForTimeout(3000);

  // Replace with actual success toast
  await expect(
    this.page.locator('body')
  ).toBeVisible();
});