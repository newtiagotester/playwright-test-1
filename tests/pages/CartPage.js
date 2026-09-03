export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }
  item(productName) { return this.cartItems.filter({ hasText: productName }); }
  async removeItem(productName) { await this.cartItems.filter({ hasText: productName }).getByRole('button', { name: 'Remove' }).click(); }
  async checkout() { await this.checkoutButton.click(); }
  async continueShopping() { await this.continueShoppingButton.click(); }
}
