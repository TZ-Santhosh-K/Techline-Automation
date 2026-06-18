import { Page } from '@playwright/test';
import partsSearchData from '../test-data/partsSearchData.json';

export class PartsSearchPage {
  constructor(private page: Page) {}

  async selectModelAndEnterName(modelName: string) {

  // Part / File dropdown click
  await this.page.getByText('Part / File').click();

  // Model option click
  await this.page.locator('text=Model').nth(1).click();

  // Enter model name
  await this.page
    .locator('input[placeholder="e.g. Zest, IQUBE..."]')
    .fill(modelName);
}

  async clickSearchButton() {

  await this.page.locator('button:has-text("Search")').click();
  await this.page.getByText('Loading...').waitFor({
    state: 'hidden',
    timeout: 300000
  });

  await this.page.getByText(partsSearchData.modelName).first().waitFor({
    state: 'visible',
    timeout: 10000
  });
  }
}