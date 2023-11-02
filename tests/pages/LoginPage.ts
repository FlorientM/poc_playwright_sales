import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly submitLogin: Locator;
  readonly submitPassword: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.emailField = page.locator('//*[@name="email"]');
    this.passwordField = page.locator('//*[@name="password"]');
    this.submitLogin = page.locator('//*[@class="mc-button js-button-continue mc-button--full"]');
    this.submitPassword = page.locator('//*[@class="mc-button mc-button--full"]');
    
  }

  async login(email:string, password:string) {
    await this.emailField.waitFor();
    await expect(this.emailField).toBeEditable();
    await this.emailField.fill(email);
    await this.page.keyboard.press('Tab');
    await expect(this.submitLogin).toBeEnabled();
    await this.submitLogin.click();
    await this.passwordField.waitFor();
    await expect(this.passwordField).toBeEditable();
    await this.passwordField.fill(password);
    await this.page.keyboard.press('Tab');
    await expect(this.submitPassword).toBeEnabled();
    await this.submitPassword.click();
  }
}