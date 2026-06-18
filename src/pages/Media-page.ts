import { Locator, Page } from '@playwright/test';

export class MediaPage {

  productTypeDropdown: Locator;
  modelDropdown: Locator;
  yearDropdown: Locator;
  tagsDropdown: Locator;
  tagSearch: Locator;
  urlInput: Locator;
  saveButton: Locator;
  fileInput: Locator;

  constructor(private page: Page) {

    this.productTypeDropdown = page.locator('button')
      .filter({ hasText: 'Select Product Type' });

    this.modelDropdown = page.locator('button')
      .filter({ hasText: 'Select Model' });

    // Year is SELECT element
    this.yearDropdown = page.locator('select').first();

this.tagsDropdown = page.locator('button')
  .filter({
    hasText: /Select Tags|tag selected/i
  })
  .first();

this.tagSearch = page.getByPlaceholder('Search tag...');

this.urlInput = page.getByPlaceholder('Enter URL');

this.fileInput = page.locator('input[type="file"]');

this.saveButton = page.getByRole('button', {
  name: 'Save'
});  }

  async enterMediaDetails(data: any) {

  // Product Type
  await this.productTypeDropdown.click();

  await this.page.getByText(data.productType, {
    exact: true
  }).click();

  // Model
  await this.modelDropdown.click();

  await this.page.getByText(data.model, {
    exact: true
  }).click();

  // Wait for loading to complete
  const loading = this.page.getByText(/Loading/i);

  if (await loading.isVisible().catch(() => false)) {
    await loading.waitFor({
      state: 'hidden',
      timeout: 30000
    });
  }

  console.log("Model selected");

  // Year (<select>)
  await this.yearDropdown.selectOption(data.year);

  console.log("Year selected");

  // Tags
  await this.tagsDropdown.click();

  await this.tagSearch.fill(data.tag);

  await this.page.getByText(data.tag, {
    exact: true
  }).click();
console.log("Tag selected");

await this.page.waitForTimeout(3000);

const urlInput = this.page.locator('input[placeholder="Enter URL"]');

console.log(
  "URL count:",
  await urlInput.count()
);

await urlInput.waitFor({
  state: 'visible',
  timeout: 10000
});

await urlInput.scrollIntoViewIfNeeded();

await urlInput.fill(data.url);

console.log("URL entered");

// File Upload
await this.fileInput.setInputFiles('./src/test-data/sample.pdf');

console.log("File uploaded");
  }}