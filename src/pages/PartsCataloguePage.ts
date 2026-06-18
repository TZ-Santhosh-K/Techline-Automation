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

    try {
      await expect(
        this.page.getByText('Loading parts...')
      ).not.toBeVisible({ timeout: 300000 });

      await this.page.locator('tbody tr').first().waitFor({
        state: 'visible',
        timeout: 10000
      });
    } catch (error) {
      await this.page.screenshot({
        path: `screenshots/parts-catalogue-failed-${Date.now()}.png`,
        fullPage: true
      });
      throw error;
    }
  }

  async verifySearchButtonDisabled() {
    await expect(
      this.page.locator('button:has-text("Search")')
    ).toBeDisabled();
  }
}