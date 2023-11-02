import { expect, Locator, Page } from '@playwright/test';

export class OrderTunnel {
    readonly page: Page;
    readonly validateCart: Locator;
    readonly validateDelivery: Locator;
    readonly paymentGtc: Locator;
    readonly paymentFilling: Locator;
    readonly paymentFormCardNumber: Locator;
    readonly paymentFormName: Locator;
    readonly paymentFormExpirationYear: Locator;
    readonly paymentFormCvc: Locator;
    readonly paymentValidation: Locator;

    constructor(page: Page) {
        this.page = page;
        this.validateCart = page.locator('//*[@class="mc-button__label" and (text()="Valider mon panier")]');
        this.validateDelivery = page.locator('//*[@class="mc-button mc-button--l mc-button--full"]');
        this.paymentGtc = page.locator('[id="checkout-payment-legal-terms"]');
        this.paymentFormCardNumber = page.frameLocator('#iFrameResizer0').locator('//*[@id="payment-cardnumber"]');
        this.paymentFormName = page.frameLocator('#iFrameResizer0').locator('//*[@id="payment-cardholdername"]');
        this.paymentFormExpirationYear = page.frameLocator('#iFrameResizer0').locator('//*[@id="payment-cardexpirationyear"]');
        this.paymentFormCvc = page.frameLocator('#iFrameResizer0').locator('//*[@id="payment-cvc"]');
        this.paymentValidation = page.locator('[id="submit-all"]');

    }

    async validateTheCart() {
        await expect(this.validateCart).toBeEnabled();
        await this.validateCart.click();
    }

    async validateTheDelivery() {
        await expect(this.validateDelivery).toBeEnabled();
        await this.validateDelivery.click();
    }

    async fillPaymentInfo() {
        await this.page.waitForTimeout(5000);
        await expect(this.paymentGtc).toBeVisible();
        await this.paymentGtc.click();
        await this.page.waitForTimeout(2000);
        await expect(this.paymentFormCardNumber).toBeEditable();
        await this.paymentFormCardNumber.fill('4111111111111111');
        await this.paymentFormName.fill('Brown')
        await this.paymentFormExpirationYear.selectOption('2030');
        await this.paymentFormCvc.fill('123');
        await expect(this.paymentValidation).toBeEnabled();
        await this.paymentValidation.click();

    }
}