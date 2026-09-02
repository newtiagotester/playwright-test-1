import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js'; import { InventoryPage } from './pages/InventoryPage.js';
test.describe('Fluxos principais do usuário', () => { test('5. Logout e fechamento de sessão', async ({ page }) => {
  const loginPage = new LoginPage(page); const inventoryPage = new InventoryPage(page);
  // 1. Fazer login com usuário válido e navegar pelo catálogo.
  await loginPage.open(); await loginPage.login('standard_user', 'secret_sauce'); await expect(inventoryPage.productsTitle).toHaveText('Products');
  // 2. Abrir o menu lateral ou a área de navegação do usuário.
  await inventoryPage.openMenu(); await expect(inventoryPage.logoutLink).toBeVisible();
  // 3. Executar 'Logout'.
  await inventoryPage.logout(); await expect(loginPage.loginButton).toBeVisible(); await expect(page).toHaveURL('https://www.saucedemo.com/');
  // 4. Tentar acessar novamente a página de produtos pelo URL sem autenticação.
  await page.goto('https://www.saucedemo.com/inventory.html'); await expect(page).toHaveURL('https://www.saucedemo.com/'); await expect(loginPage.loginButton).toBeVisible();
  // 5. Validar que a sessão foi limpa e o carrinho não permanece acessível sem login.
  await page.goto('https://www.saucedemo.com/cart.html'); await expect(page).toHaveURL('https://www.saucedemo.com/'); await expect(loginPage.usernameInput).toBeVisible();
}); });