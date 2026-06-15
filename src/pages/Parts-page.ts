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

  constructor(private page: Page) {
    this.libraryMenu = this.page.locator('text=Library');
    this.partsLink = this.page.locator('text=Parts');
    this.createButton = this.page.locator('button:has-text("Create")');
    this.addPartsHeader = this.page.locator('text=Add Parts');
    this.partNumberInput = this.page.locator('input[placeholder="Enter part number"]');
    this.partNameInput = this.page.locator('input[placeholder="Enter part name"]');
    this.partDescriptionInput = this.page.locator('textarea[placeholder="Enter part description"]');
    this.alternatePartNumberInput = this.page.locator('input[placeholder="Enter alternate part number"]');
    this.saveDraftButton = this.page.locator('button:has-text("Save Draft")');
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

    await this.partDescriptionInput.fill(
      data.partDescription
    );

    await this.alternatePartNumberInput.fill(
      data.alternatePartNumber
    );
  }

  async clickSaveDraft() {
    await this.saveDraftButton.click();
  }
}