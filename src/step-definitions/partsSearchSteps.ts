import { Given, When, Then } from '@cucumber/cucumber';
import { PartsSearchPage } from '../pages/PartsSearchPage';
import partsSearchData from '../test-data/partsSearchData.json';

let partsSearchPage: PartsSearchPage;

Given('User navigates to Parts Search', async function () {

  partsSearchPage = new PartsSearchPage(this.page);

  await this.page.goto(
    'https://stage-techline.tamilzorous.com/parts-search'
  );
});

When(
  'User select the part type as model and enteres the model name in the search field',
  async function () {
    await partsSearchPage.selectModelAndEnterName(
      partsSearchData.modelName
    );
  }
);

When('User click the Search button in Parts Search', async function () {

  await partsSearchPage.clickSearchButton();

});

Then('Search results should be displayed in Parts Search', async function () {

  await this.page.screenshot({
    path: `screenshots/parts-search-${Date.now()}.png`,
    fullPage: true
  });
});