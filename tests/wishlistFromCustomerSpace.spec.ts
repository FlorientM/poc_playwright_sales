import { test, expect } from '@playwright/test';
import { MenuPage } from './pages/menuPage';
import { LoginPage } from './pages/LoginPage';
import { ProductPage } from './pages/ProductPage';
import { getDatalib } from '../utils/datasetManager';
import { WishlistPage } from './pages/wishlistPage';
import { CustomerSpacePage } from './pages/CustomerSpacePage';
import moment from 'moment';

test.use({ userAgent: 'LMUser Cerberus' });

test('go to the homepage', async({ page }) => {
    const menuPage = new MenuPage(page);
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const wishlistPage = new WishlistPage(page);
    const customerSpacePage = new CustomerSpacePage(page);
    const loyalty = page.locator('//*[@class="ipn-loyalty-card-no-loyalty"]');
    const customer = await getDatalib('lmfr-uat', 'LM-CUSTOMER');
    const product = await getDatalib('lmfr-uat', 'LM-1P-DATASET');

    test.step('Go to Homepage', async () => {await menuPage.goto()});
        await menuPage.validateConsentCookies();
        await menuPage.goToAccountLogin();
        await loginPage.login(customer.user.email, customer.user.password);
        // Les deux lignes suivantes servent à attendre que la page ait fini de charger sinon le robot va trop vite
        await loyalty.waitFor();
        await expect(loyalty).toBeVisible();
        await customerSpacePage.goToWishlist();
    });