import { test, expect } from '@playwright/test';
import { MenuPage } from '../pages/MenuPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { OrderTunnel } from '../pages/OrderTunnel';
import { getDatalib } from '../utils/datasetManager';
import { WishlistPage } from '../pages/wishlistPage';
import moment from 'moment';

test.use({ userAgent: 'LMUser Cerberus' });

test('go to the homepage', async({ page }) => {
        const menuPage = new MenuPage(page);
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const orderTunnel = new OrderTunnel(page);
        const wishlistPage = new WishlistPage(page);
        const loyalty = page.locator('//*[@class="ipn-loyalty-card-no-loyalty"]');
        const checkoutReview = page.locator('//*[@class="confirmation-header-message"]');
        const customer = await getDatalib('lmfr-uat', 'LM-CUSTOMER');
        const product = await getDatalib('lmfr-uat', 'LM-1P-DATASET');

        test.step('Go to Homepage', async () => {await menuPage.goto()});
        await menuPage.validateConsentCookies();
        await menuPage.goToAccountLogin();
        await loginPage.login(customer.user.email, customer.user.password);
        // Les deux lignes suivantes servent à attendre que la page ait fini de charger sinon le robot va trop vite
        await loyalty.waitFor();
        await expect(loyalty).toBeVisible();
        await menuPage.goToAProductPage(product.product.RNC1P);
        await productPage.addProductToWishlist();
        await productPage.createWishlistName();
        await productPage.validateWishlistCreation();
        await productPage.checkItemAddedToWishlist();
        await productPage.goToSeeMyLists();
        await wishlistPage.checkWishlistDetails(product.product.RNC1P);
        await wishlistPage.addToCartFromTheWhishlist();
        await menuPage.goToCart();
        await orderTunnel.validateTheCart();
        await orderTunnel.validateTheDelivery();
        await orderTunnel.fillPaymentInfo();
        await checkoutReview.waitFor();
        await expect(checkoutReview).toBeVisible();

        let dateString = moment().format("YYYYMMDD-HHmmss");

        await page.screenshot({ path: 'test-results/screenshots/'+ dateString + '.png', fullPage: true });
});