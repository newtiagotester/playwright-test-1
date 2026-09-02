import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js'; import { InventoryPage } from './pages/InventoryPage.js'; import { CartPage } from './pages/CartPage.js';
test.describe('Fluxos principais do usuário', () => {
  test('3. Adicionar itens ao carrinho', async ({ page }) => {
    const loginPage = new LoginPage(page); const inventoryPage = new InventoryPage(page); const cartPage = new CartPage(page);
    // 1. Entrar no catálogo em estado autenticado.
    await loginPage.open(); await loginPage.login('standard_user', 'secret_sauce'); await expect(inventoryPage.productItems).toHaveCount(6);
    // 2. Adicionar dois produtos diferentes ao carrinho.
    await inventoryPage.addProduct('Sauce Labs Backpack'); await inventoryPage.addProduct('Sauce Labs Bike Light'); await expect(inventoryPage.cartBadge).toHaveText('2'); await expect(inventoryPage.productAction('Sauce Labs Backpack')).toHaveText('Remove'); await expect(inventoryPage.productAction('Sauce Labs Bike Light')).toHaveText('Remove');
    // 3. Abrir o carrinho a partir do ícone de carrinho.
    await inventoryPage.openCart(); await expect(cartPage.cartTitle).toHaveText('Your Cart'); await expect(cartPage.cartItems).toHaveCount(2);
    // 4. Remover um item do carrinho e confirmar a atualização.
    await cartPage.removeItem('Sauce Labs Backpack'); await expect(cartPage.cartBadge).toHaveText('1'); await expect(cartPage.item('Sauce Labs Backpack')).toHaveCount(0); await expect(cartPage.item('Sauce Labs Bike Light')).toHaveCount(1);
    // 5. Retornar ao catálogo usando 'Continue Shopping'.
    await cartPage.continueShopping(); await expect(page).toHaveURL(/inventory\.html$/); await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});