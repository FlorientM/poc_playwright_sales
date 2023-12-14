import { test, expect } from '@playwright/test';
import { MenuPage } from '../pages/MenuPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { OrderTunnel } from '../pages/OrderTunnel';
import { getDatalib } from '../utils/datasetManager';
import moment from 'moment';

test.use({ userAgent: 'LMUser Cerberus' });

test('go to the homepage', async({ page }) => {
        const menuPage = new MenuPage(page);
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const orderTunnel = new OrderTunnel(page);
        const loyalty = page.locator('//*[@class="ipn-loyalty-card-no-loyalty"]');
        // const checkoutReview = page.getByRole('heading', { name: 'Récapitulatif' })
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
        await productPage.addProductToCart();
        await productPage.seeTheCart();
        await orderTunnel.validateTheCart();
        await orderTunnel.validateTheDelivery();
        await orderTunnel.fillPaymentInfo();
        await checkoutReview.waitFor();
        await expect(checkoutReview).toBeVisible();
        /*
        let date = new Date();
        let year: string = date.getFullYear().toString();
        let month: string =  (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() +1).toString();
        let day: string = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()).toString();
        let hours: string = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()).toString();
        let minutes: string = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()).toString();
        let secondes: string = (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()).toString();
        let dateString = year + month + day+"-"+hours+minutes+secondes;
        */
        // la fonction suivante condense tout le code commenté précédent
        let dateString = moment().format("YYYYMMDD-HHmmss");

        await page.screenshot({ path: 'test-results/screenshots/'+ dateString + '.png', fullPage: true });
        // await page.screenshot({path: '././test-results/checkoutreview.png', fullPage: true});
});