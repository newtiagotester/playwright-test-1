import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js'; import { InventoryPage } from './pages/InventoryPage.js'; import { CartPage } from './pages/CartPage.js'; import { CheckoutPage } from './pages/CheckoutPage.js';
test.describe('Fluxos principais do usuário', () => {
  test('4. Finalizar compra no checkout', async ({ page }) => {
    const loginPage = new LoginPage(page); const inventoryPage = new InventoryPage(page); const cartPage = new CartPage(page); const checkoutPage = new CheckoutPage(page);
    // 1. Realizar login e adicionar itens ao carrinho.
    await loginPage.open(); await loginPage.login('standard_user', 'secret_sauce'); await inventoryPage.addProduct('Sauce Labs Backpack'); await inventoryPage.openCart(); await expect(cartPage.cartItems).toHaveCount(1);
    // 2. Clicar em 'Checkout'.
    await cartPage.checkout(); await expect(checkoutPage.informationTitle).toHaveText('Checkout: Your Information');
    // 3. Preencher nome, sobrenome e CEP com dados válidos.
    await checkoutPage.fillCustomerInformation('Tiago', 'Leite', '12345-678'); await expect(checkoutPage.firstNameInput).toHaveValue('Tiago'); await expect(checkoutPage.lastNameInput).toHaveValue('Leite'); await expect(checkoutPage.postalCodeInput).toHaveValue('12345-678');
    // 4. Avançar para a revisão do pedido.
    await checkoutPage.continueToOverview(); await expect(checkoutPage.overviewTitle).toHaveText('Checkout: Overview'); await expect(checkoutPage.itemTotal).toContainText('Item total: $29.99'); await expect(checkoutPage.total).toContainText('Total: $32.39');
    // 5. Confirmar a compra com 'Finish'.
    await checkoutPage.finishOrder(); await expect(checkoutPage.completeTitle).toHaveText('Thank you for your order!'); await expect(page).toHaveURL(/checkout-complete\.html/);
  });
});