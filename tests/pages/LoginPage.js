export class LoginPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.login_logo');
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('input[type="submit"]');
  }
  async open() { await this.page.goto('https://www.saucedemo.com'); }
  async fillCredentials(username, password) { await this.usernameInput.fill(username); await this.passwordInput.fill(password); }
  async submit() { await this.loginButton.click(); }
  async login(username, password) { await this.fillCredentials(username, password); await this.submit(); }
}
