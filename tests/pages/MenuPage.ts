import { expect, Locator, Page } from '@playwright/test';

export class MenuPage {
    readonly page: Page;
    readonly accountLink: Locator;
    readonly productListLink: Locator;
    readonly cartLink: Locator;
    readonly validateCookies: Locator;
    readonly searchProduct: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountLink = page.getByTestId('CPT_accountheader');
        this.cartLink = page.getByTestId('CPT_headercart');
        // La variable suivante devra être modifiée pour s'adapter à toutes les langues
        this.validateCookies = page.getByRole('button', { name: 'Continuer sans accepter' });
        this.searchProduct = page.getByPlaceholder('Rechercher un produit, une marque...');
      }

      async goto(PathUrl:any) {
        await this.page.goto("" + PathUrl);
        await this.page.waitForLoadState();
      }
    
      async goToAccountLogin() {
        await this.accountLink.click();
      }

      async goToCart() {
        await this.cartLink.click();
      }

      async validateConsentCookies() {
        if(await this.validateCookies.isEnabled())
        await this.validateCookies.click();
      }
      
      async checkWebsiteTitle(pageTitle) {
        expect(this.page).toHaveTitle(pageTitle);
      }

      async goToAProductPage(adeoKey:any) {
        await this.searchProduct.fill(adeoKey);
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState();
      }
}