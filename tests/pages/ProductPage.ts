import { expect, Locator, Page } from '@playwright/test';
import { getDataLib } from '../../utils/datasetManager';
import exp from 'constants';

export class ProductPage {
    readonly page: Page;
    readonly addToCart: Locator;
    readonly seeMyCart: Locator;
    readonly addToWishlist: Locator;
    readonly inputCreateWishlist: Locator;
    readonly validateWishlistButton: Locator;
    readonly itemAddToWishlist: Locator;
    readonly seeMyLists: Locator;
    readonly selectAllButton: Locator;
    readonly qtySelectorField: Locator;
    readonly addToCartFromWishlist: Locator;
    readonly deleteFromWishlist: Locator;
    readonly availabilityBlock: Locator;
    readonly addWishlistToCart: Locator;
    readonly deleteTheWishlist: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCart = page.getByTestId('BTN_addtocart');
        this.seeMyCart = page.getByTestId('BTN_Voir-mon-panier');
        this.addToWishlist = page.getByTestId('BTN_addToShoppingList');
        this.inputCreateWishlist = page.getByTestId('INPUT_createShoppingList');
        this.validateWishlistButton = page.getByTestId('BTN_submitAddToShoppingList');
        this.itemAddToWishlist = page.getByTestId('itemAddToShoppingList');
        this.seeMyLists = page.getByTestId('BTN_showList');
        this.selectAllButton = page.locator('//*[@data-testid="wishlist-select-all-button"]');
        this.qtySelectorField = page.locator('(//*[@class="offer-line"])[1]//*[contains(concat(" ",normalize-space(@class)," "), " offer-line__container-actions--desktop ")]//*[@id="qty-selector"]');
        this.addToCartFromWishlist = page.locator('(//*[@class="mc-button__label"][contains(.,"Ajouter au panier")])[1]');
        this.deleteFromWishlist = page.locator('(//*[@data-testid="delete-item-button"])[1]');
        this.availabilityBlock = page.locator('(//*[@class="availability-information-block"])[1]');
        this.addWishlistToCart = page.locator('//*[@class="mc-button__label"][contains(.,"Ajouter la liste au panier")]');
        this.deleteTheWishlist = page.locator('//*[@class="mc-button__label"][contains(.,"Supprimer la liste")]');
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
        await this.page.waitForTimeout(2000);
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

    async goToSeeMyLists() {
        await this.seeMyLists.click();
    }

    async checkWishlistDetails(adeoKey: string) {
        await expect(this.page.locator('//*[@class="offer-showcase__ref"]/p[contains(.,"' + adeoKey +'")]')).toBeVisible();
        await expect(this.selectAllButton).toBeEnabled;
        await expect(this.qtySelectorField).toBeVisible;
        await expect(this.addToCartFromWishlist).toBeEnabled;
        await expect(this.deleteFromWishlist).toBeEnabled;
        await expect(this.availabilityBlock).toBeVisible;
        await expect(this.addWishlistToCart).toBeEnabled;
        await expect(this.deleteTheWishlist).toBeEnabled;
    }
}