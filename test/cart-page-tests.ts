declare var test: TestFn;
import { ClientFunction, Selector } from 'testcafe';
import { domainUrl, metaDataProperties, testTypes } from './utilities';

const url = `${domainUrl}/fe/cart`;
const setCookie = ClientFunction((cartId) => {
    // tslint:disable-next-line:no-cookies
    document.cookie = `cart=${cartId}`;
});

fixture('Cart page tests').page(url);

test.skip
    .meta(metaDataProperties.TestType, testTypes.DVT)
    .before(async (testController: TestController) => {
        const cartId = '-chIQT84lguZvaep0ShyEFlxBGaAkjlA';
        await setCookie(cartId);
        await testController.navigateTo(url);
    })
    ('Validate cart page render', async (testController: TestController) => {
        // Validate cart module render
        const modules = Selector('#renderPage .cart-container');
        const cartLines = modules.find('.cart-line-item');
        await testController.expect(cartLines.count).eql(2, 'Cart-line-items: Cart should have 2 line items.', { timeout: 30000 });
    });