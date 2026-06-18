import { Locator, Page } from '@playwright/test';

export class PartsPage {
  libraryMenu: Locator;
  partsLink: Locator;

  // Parts Listing
  createButton: Locator;
  addPartsHeader: Locator;
  partNumberInput: Locator;
  partNameInput: Locator;
  partDescriptionInput: Locator;
  alternatePartNumberInput: Locator;
  saveDraftButton: Locator;
  publishButton: Locator;

   // Dropdowns
  systemSelection: Locator;
  colorSelection: Locator;
  productCodeSelection: Locator;
  workstreamSelection: Locator;
  errorCodeSelection: Locator;
  productCodeDropdown: Locator;
  productCodeSearch: Locator;
  yearDropdown: Locator;

  constructor(private page: Page) {
    this.libraryMenu = this.page.locator('text=Library');
    this.partsLink = this.page.locator('text=Parts');
    this.createButton = this.page.locator('button:has-text("Create")');
    this.addPartsHeader = this.page.getByRole('heading', {
    name: 'Add Parts'
    });
    this.partNumberInput =this.page.getByPlaceholder('Enter part number');
    this.partNameInput =this.page.getByPlaceholder('Enter part name');
    this.partDescriptionInput =
    this.page.getByPlaceholder('Enter part description');
    this.alternatePartNumberInput =
    this.page.getByPlaceholder('Enter alternate part number');
    this.saveDraftButton = this.page.locator('button:has-text("Save Draft")');
    this.publishButton = this.page.locator('button:has-text("Publish")');
    this.productCodeDropdown = this.page
.locator('button')
.filter({ hasText: /Select product codes|tag selected/i })
.first();

this.productCodeSearch =
this.page.getByPlaceholder('Search tags...');
this.yearDropdown = this.page
  .locator('button')
  .filter({ hasText: /Select year|year selected/i })
  .first();
}

  async navigateToParts() {
    await this.libraryMenu.click();
    await this.partsLink.click();
  }

  async clickCreateButton() {
    await this.createButton.click();
  }

  async enterPartDetails(data: any) {
  await this.partNumberInput.fill(data.partNumber);
  await this.partNameInput.fill(data.partName);
  await this.partDescriptionInput.fill(data.partDescription);
  await this.alternatePartNumberInput.fill(data.alternatePartNumber);

  // Product code dropdown open
await this.productCodeDropdown.click();

// Search product code
await this.productCodeSearch.fill(data.productCode);

// Select product code
await this.page.getByText(data.productCode, { exact: true }).click();

// Outside click to close popup
await this.page.locator('body').click({
  position: { x: 20, y: 20 }
});

await this.page.waitForTimeout(1000);

// Year dropdown open
await this.yearDropdown.waitFor({ state: 'visible' });
await this.yearDropdown.click();

// Select year
await this.page.getByText(data.year, { exact: true }).click();

// // Publish
// await this.publishButton.click();
  }
}
