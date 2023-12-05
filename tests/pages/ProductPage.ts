import { expect, Locator, Page } from '@playwright/test';
import exp from 'constants';

export class ProductPage {
    readonly page: Page;
    readonly addToCart: Locator;
    readonly seeMyCart: Locator;
    readonly addToWishlist: Locator;
    readonly inputCreateWishlist: Locator;
    readonly validateWishlistButton: Locator;
    readonly itemAddToWishlist: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCart = page.getByTestId('BTN_addtocart');
        this.seeMyCart = page.getByTestId('BTN_Voir-mon-panier');
        this.addToWishlist = page.getByTestId('BTN_addToShoppingList');
        this.inputCreateWishlist = page.getByTestId('INPUT_createShoppingList');
        this.validateWishlistButton = page.getByTestId('BTN_submitAddToShoppingList');
        this.itemAddToWishlist = page.getByTestId('itemAddToShoppingList');
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

    async addProductToWishlist() {
        await expect(this.addToWishlist).toBeEnabled;
        await this.addToWishlist.focus();
        await this.addToWishlist.click();
    }

    async createWishlistName() {
        await expect(this.inputCreateWishlist).toBeEditable;
        await this.inputCreateWishlist.click();
        await this.inputCreateWishlist.pressSequentially('WishlistFlo');
    }

    async validateWishlistCreation() {
        await expect(this.validateWishlistButton).toBeEnabled;
        await this.validateWishlistButton.click();
    }

    async checkItemAddedToWishlist() {
        await expect(this.itemAddToWishlist).toBeVisible();
    }
}