import { Given, When, Then } from '@cucumber/cucumber';
import { PartsCataloguePage } from '../pages/PartsCataloguePage';
import partsCatalogueData from '../test-data/partsCatalogueData.json';

let partsCataloguePage: PartsCataloguePage;

Given('User navigates to Parts', async function () {
  partsCataloguePage = new PartsCataloguePage(this.page);

  await this.page.goto('https://stage-techline.tamilzorous.com/parts-catalogue');
});

When('User click the framenumber text box and enters framenumber', async function () {
  await partsCataloguePage.enterFrameNumber(
    (partsCatalogueData as any).frameNumber
  );
});

When('User click the Search button', async function () {
  await partsCataloguePage.clickSearchButton();
});

Then('Search results should be displayed', async function () {
  await this.page.locator('tbody tr').first().waitFor({
    state: 'visible',
    timeout: 300000
  });
  await this.page.screenshot({
    path: `screenshots/search-result-${Date.now()}.png`,
    fullPage: true
  });
});

Then('Search button should remain disabled', async function () {

  await partsCataloguePage.verifySearchButtonDisabled();

  await this.page.screenshot({
    path: `screenshots/empty-search-${Date.now()}.png`,
    fullPage: true
  });

});