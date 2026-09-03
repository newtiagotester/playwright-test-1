export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.informationTitle = page.locator('.title');
    this.overviewTitle = page.locator('.title');
    this.completeTitle = page.locator('.complete-header');
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.total = page.locator('.summary_total_label');
  }
  async fillCustomerInformation(firstName, lastName, postalCode) { await this.firstNameInput.fill(firstName); await this.lastNameInput.fill(lastName); await this.postalCodeInput.fill(postalCode); }
  async continueToOverview() { await this.continueButton.click(); }
  async finishOrder() { await this.finishButton.click(); }
}
