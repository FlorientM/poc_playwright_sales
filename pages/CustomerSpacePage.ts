import { expect, Locator, Page } from '@playwright/test';

export class CustomerSpacePage {
    readonly page: Page;
    readonly goToWishlistLink: Locator;

    constructor (page: Page) {
        this.page = page;
        this.goToWishlistLink = page.getByRole('link', { name: 'Listes de courses' });
    }

    async goToWishlist() {
        await this.goToWishlistLink.click();
    }
}