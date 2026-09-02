import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { InventoryPage } from './pages/InventoryPage.js';
test.describe('Fluxos principais do usuário', () => { test('1. Login com usuário válido', async ({ page }) => {
  const loginPage = new LoginPage(page); const inventoryPage = new InventoryPage(page);
  // 1. Abrir a página inicial do Saucedemo em estado fresh, sem sessão ativa.
  await loginPage.open(); await expect(loginPage.usernameInput).toBeVisible(); await expect(loginPage.passwordInput).toBeVisible();
  // 2. Informar o username 'standard_user' e a senha 'secret_sauce'.
  await loginPage.fillCredentials('standard_user', 'secret_sauce'); await expect(loginPage.usernameInput).toHaveValue('standard_user'); await expect(loginPage.passwordInput).toHaveValue('secret_sauce');
  // 3. Clicar no botão 'Login'.
  await loginPage.submit(); await expect(page).toHaveURL(/inventory\.html/);
  // 4. Confirmar a presença da lista de itens e do título 'Products'.
  await expect(inventoryPage.productsTitle).toHaveText('Products'); await expect(inventoryPage.productItems.first()).toBeVisible();
}); });