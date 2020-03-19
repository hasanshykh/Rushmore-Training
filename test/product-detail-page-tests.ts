declare var test: TestFn;
import { Selector } from 'testcafe';
import { domainUrl, metaDataProperties, testTypes } from './utilities';

const url = `${domainUrl}/fe/fashion/fashion-accessories/brown-leather-travel-bag/22565430647.p`;

fixture('Product detail page tests').page(url);

test.skip
    .meta(metaDataProperties.TestType, testTypes.DVT)
    ('Validate product detail page render', async (testController: TestController) => {
        // Validate buybox module render
        const modules = Selector('#renderPage .buybox');
        await testController.expect(modules.find('.product-title').exists).eql(true, 'BuyBox: Could not find product title.');
        await testController.expect(modules.find('.quantity').exists).eql(true, 'BuyBox: Could not find quantity input.');
        await testController.expect(modules.find('.add-to-cart').exists).eql(true, 'BuyBox: Could not find add to cart button.');
    });