export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartTitle = page.getByText('Your Cart', { exact: true });
    this.cartItems = page.getByTestId('inventory-item');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }
  item(productName) { return this.cartItems.filter({ hasText: productName }); }
  async removeItem(productName) { await this.page.getByTestId(`remove-${productName.toLowerCase().replaceAll(' ', '-')}`).click(); }
  async checkout() { await this.checkoutButton.click(); }
  async continueShopping() { await this.continueShoppingButton.click(); }
}
