export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.productsTitle = page.getByText('Products', { exact: true });
    this.productItems = page.getByTestId('inventory-item');
    this.productNames = page.getByTestId('inventory-item-name');
    this.productPrices = page.getByTestId('inventory-item-price');
    this.addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
  }
  productAction(productName) { return this.productItems.filter({ hasText: productName }).getByRole('button'); }
  async addProduct(productName) {
    const productTestIds = { 'Sauce Labs Backpack': 'add-to-cart-sauce-labs-backpack', 'Sauce Labs Bike Light': 'add-to-cart-sauce-labs-bike-light' };
    await this.page.getByTestId(productTestIds[productName]).click();
  }
  async sortProducts(option) { await this.sortDropdown.selectOption(option); }
  async openProduct(productName) { await this.page.getByText(productName, { exact: true }).first().click(); }
  async openCart() { await this.page.getByTestId('shopping-cart-link').click(); }
  async openMenu() { await this.menuButton.click(); }
  async logout() { await this.logoutLink.click(); }
  async backToProducts() { await this.page.getByTestId('back-to-products').click(); }
}
