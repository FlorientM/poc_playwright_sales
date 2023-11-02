import { expect, Locator, Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly addToCart: Locator;
    readonly seeMyCart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCart = page.getByTestId('BTN_addtocart');
        this.seeMyCart = page.getByTestId('BTN_Voir-mon-panier');
    }

    async addProductToCart() {
        await expect(this.addToCart).toBeEnabled;
        await this.page.waitForTimeout(1000);
        await this.addToCart.click();
    }

    async seeTheCart() {
        await expect(this.seeMyCart).toBeEnabled;
        await this.seeMyCart.click();
    }
}