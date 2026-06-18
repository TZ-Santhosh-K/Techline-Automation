import { expect, Page } from '@playwright/test';

export class PartsCataloguePage {
  constructor(private page: Page) {}

  async enterFrameNumber(frameNumber: string) {
    await this.page
      .locator('input[placeholder="Frame Number (VIN)"]')
      .fill(frameNumber);
  }

   async clickSearchButton() {
    await this.page.locator('button:has-text("Search")').click();

    // Search results varum varaikum wait
    await this.page.locator('tbody tr').first().waitFor({
      state: 'visible',
      timeout: 150000
    });

    // Loading parts innum visible-a irundha fail
    await expect(
      this.page.getByText('Loading parts...')
    ).not.toBeVisible();
  }
}