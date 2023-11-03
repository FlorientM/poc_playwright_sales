import { test, expect } from '@playwright/test';
import { MenuPage } from './pages/menuPage';
import { LoginPage } from './pages/LoginPage';
import { ProductPage } from './pages/ProductPage';
import { OrderTunnel } from './pages/OrderTunnel';
import { getDataLib } from '../utils/datasetManager';

test.use({ userAgent: 'LMUser Cerberus' });

test('go to the homepage', async({ page }) => {
        const menuPage = new MenuPage(page);
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const orderTunnel = new OrderTunnel(page);
        const loyalty = page.locator('//*[@class="ipn-loyalty-card-no-loyalty"]');
        // const checkoutReview = page.getByRole('heading', { name: 'Récapitulatif' })
        const checkoutReview = page.locator('//*[@class="confirmation-header-message"]');
        const customer = await getDataLib('LM-CUSTOMER');
        const product = await getDataLib('LM-1P-DATASET');

        await menuPage.goto();
        await menuPage.validateConsentCookies();
        await menuPage.goToAccountLogin();
        await loginPage.login(customer.user.email, customer.user.password);
        // Les deux lignes suivantes servent à attendre que la page ait fini de charger sinon le robot va trop vite
        await loyalty.waitFor();
        await expect(loyalty).toBeVisible();
        await menuPage.goToAProductPage(product.product.RNC1P);
        await productPage.addProductToCart();
        await productPage.seeTheCart();
        await orderTunnel.validateTheCart();
        await orderTunnel.validateTheDelivery();
        await orderTunnel.fillPaymentInfo();
        await checkoutReview.waitFor();
        await expect(checkoutReview).toBeVisible();

        let date = new Date();
        let year: string = date.getFullYear().toString();
        let month: string =  (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() +1).toString();
        let day: string = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()).toString();
        let hours: string = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()).toString();
        let minutes: string = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()).toString();
        let secondes: string = (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()).toString();
        let dateString = year + month + day+"-"+hours+minutes+secondes;

        await page.screenshot({ path: 'test-results/screenshots/'+ dateString + '.png', fullPage: true });
        // await page.screenshot({path: '././test-results/checkoutreview.png', fullPage: true});
});