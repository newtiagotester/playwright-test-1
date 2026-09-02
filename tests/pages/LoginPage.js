export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }
  async open() { await this.page.goto('https://www.saucedemo.com'); }
  async fillCredentials(username, password) { await this.usernameInput.fill(username); await this.passwordInput.fill(password); }
  async submit() { await this.loginButton.click(); }
  async login(username, password) { await this.fillCredentials(username, password); await this.submit(); }
}
