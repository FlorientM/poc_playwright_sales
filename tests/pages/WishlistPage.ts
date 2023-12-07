import { expect, Locator, Page } from '@playwright/test';

// Move the 'checkWishlistDetails' function from ProductPage.ts here once it's okay
// Update the wishlist.spec.ts and the orderFromWishlist.spec.ts when it's done

export class WishlistPage {
    readonly page: Page;
    readonly addWishlistToCart: Locator;
    readonly deleteTheWishlist: Locator;
    readonly selectAllButton: Locator;
    readonly qtySelectorField: Locator;
    readonly addToCartFromWishlist: Locator;
    readonly deleteFromWishlist: Locator;
    readonly availabilityBlock: Locator;

    constructor(page: Page) {
        this.page = page;
        this.selectAllButton = page.locator('//*[@data-testid="wishlist-select-all-button"]');
        this.qtySelectorField = page.locator('(//*[@class="offer-line"])[1]//*[contains(concat(" ",normalize-space(@class)," "), " offer-line__container-actions--desktop ")]//*[@id="qty-selector"]');
        this.addToCartFromWishlist = page.locator('(//*[@class="mc-button__label"][contains(.,"Ajouter au panier")])[1]');
        this.deleteFromWishlist = page.locator('(//*[@data-testid="delete-item-button"])[1]');
        this.availabilityBlock = page.locator('(//*[@class="availability-information-block"])[1]');
        this.addWishlistToCart = page.locator('//*[@class="mc-button__label"][contains(.,"Ajouter la liste au panier")]');
        this.deleteTheWishlist = page.locator('//*[@class="mc-button__label"][contains(.,"Supprimer la liste")]');
      
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

    async addToCartFromTheWhishlist() {
        await this.addToCartFromWishlist.click();
    }
}