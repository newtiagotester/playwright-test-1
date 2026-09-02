import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js'; import { InventoryPage } from './pages/InventoryPage.js';
test.describe('Fluxos principais do usuário', () => { test('2. Navegação e exploração do catálogo', async ({ page }) => {
  const loginPage = new LoginPage(page); const inventoryPage = new InventoryPage(page);
  // 1. Efetuar login com usuário válido.
  await loginPage.open(); await loginPage.login('standard_user', 'secret_sauce'); await expect(inventoryPage.productsTitle).toHaveText('Products');
  // 2. Visualizar os itens, nomes, preços e botões de ação.
  await expect(inventoryPage.productItems).toHaveCount(6); await expect(inventoryPage.productNames.first()).toBeVisible(); await expect(inventoryPage.productPrices.first()).toBeVisible(); await expect(inventoryPage.addToCartButtons.first()).toBeVisible();
  // 3. Usar a ordenação do catálogo para alterar a ordem dos produtos.
  await inventoryPage.sortProducts('lohi'); await expect(inventoryPage.sortDropdown).toHaveValue('lohi');
  // 4. Abrir o detalhe de um item específico.
  await inventoryPage.openProduct('Sauce Labs Backpack'); await expect(page.getByRole('img', { name: 'Sauce Labs Backpack' })).toBeVisible(); await expect(page.getByText('$29.99', { exact: true })).toBeVisible(); await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
  // 5. Retornar ao catálogo sem perder a sessão.
  await inventoryPage.backToProducts(); await expect(page).toHaveURL(/inventory\.html$/); await expect(inventoryPage.productsTitle).toHaveText('Products');
}); });