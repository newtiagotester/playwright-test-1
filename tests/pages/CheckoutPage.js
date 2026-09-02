export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.informationTitle = page.getByText('Checkout: Your Information', { exact: true });
    this.overviewTitle = page.getByText('Checkout: Overview', { exact: true });
    this.completeTitle = page.getByText('Thank you for your order!', { exact: true });
    this.firstNameInput = page.getByLabel('First Name');
    this.lastNameInput = page.getByLabel('Last Name');
    this.postalCodeInput = page.getByLabel('Zip/Postal Code');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.itemTotal = page.getByText(/Item total:/);
    this.total = page.getByText(/^Total:/);
  }
  async fillCustomerInformation(firstName, lastName, postalCode) { await this.firstNameInput.fill(firstName); await this.lastNameInput.fill(lastName); await this.postalCodeInput.fill(postalCode); }
  async continueToOverview() { await this.continueButton.click(); }
  async finishOrder() { await this.finishButton.click(); }
}
