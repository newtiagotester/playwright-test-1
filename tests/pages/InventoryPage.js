export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.productsTitle = page.locator('.title');
    this.productItems = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.addToCartButtons = page.locator('button.btn_inventory');
    this.sortDropdown = page.locator('.product_sort_container');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
  }
  productAction(productName) { return this.productItems.filter({ hasText: productName }).locator('button'); }
  async addProduct(productName) {
    const productButtons = {
      'Sauce Labs Backpack': 'add-to-cart-sauce-labs-backpack',
      'Sauce Labs Bike Light': 'add-to-cart-sauce-labs-bike-light',
    };
    const productId = productButtons[productName];
    await this.page.locator(`#${productId}`).click();
  }
  async sortProducts(option) { await this.sortDropdown.selectOption(option); }
  async openProduct(productName) { await this.productItems.filter({ hasText: productName }).locator('.inventory_item_name').click(); }
  async openCart() { await this.page.locator('.shopping_cart_link').click(); }
  async openMenu() { await this.menuButton.click(); }
  async logout() { await this.logoutLink.click(); }
  async backToProducts() { await this.page.getByRole('button', { name: 'Back to products' }).click(); }
}
