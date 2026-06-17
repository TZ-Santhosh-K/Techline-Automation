  import {
    Given,
    When,
    Then
  } from '@cucumber/cucumber';
  import { expect } from '@playwright/test';
  import { MediaPage } from '../pages/Media-page';
  import { mediaData } from '../test-data/mediaData';

  let mediaPage: MediaPage;

  Given('User navigates to Library for Media', async function () {
    await this.page.getByRole('button', { name: 'Library' }).click();
  });

  When('User clicks on Media link', async function () {

    mediaPage = new MediaPage(this.page);

    await this.page.getByRole('button', {
    name: 'Media Manager'
  }).click();
  });

  Then('Media listing page should be displayed', async function () {
    await expect(
    this.page.getByRole('heading', {
      name: 'Media Manager'
    })
  ).toBeVisible();
  });

  When('User click the Media Create button', async function () {

  timeout: 10000
  await this.page.getByRole('button', {
    name: 'Upload',
    exact: true
  }).click();

});

  Then('Add Media page should be displayed', async function () {
  await expect(
    this.page.getByRole('heading', {
      name: 'Upload Files'
    })
  ).toBeVisible({
    timeout: 10000
  });
});

 When('User enters media details', async function () {
  await mediaPage.enterMediaDetails(mediaData);
});

  When('User click the Save button', async function () {

    await this.page.getByRole('button', {
    name: 'Save'
  }).click();
  });

  Then('Media should be saved successfully', async function () {

    await this.page.waitForTimeout(3000);

    await expect(
      this.page.locator('body')
    ).toBeVisible();
  });