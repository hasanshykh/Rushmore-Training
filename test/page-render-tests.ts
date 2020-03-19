declare var test: TestFn;
import { ClientFunction, Selector, t } from 'testcafe';
import { domainUrl, metaDataProperties, testTypes } from './utilities';

// Fail if there is any error on client
export default async function checkErrors(): Promise<void> {
    const { error } = await t.getBrowserConsoleMessages();
    await t.expect(error[0]).notOk();
}

const url = `${domainUrl}/page?mock=default-page`;

fixture('Default Page tests').page(url);

const getWindowLocation = ClientFunction(() => window.location);

test
    .meta(metaDataProperties.TestType, testTypes.BVT)
    ('validate renderPage div render', async (testController: TestController) => {
        console.log('url: ', await getWindowLocation());
        const renderPageDiv = Selector('#renderPage');
        await testController.expect(renderPageDiv.exists).eql(true, 'Could not find default page container');
    });