declare var test: TestFn;
import { Selector, t } from 'testcafe';
import { domainUrl, metaDataProperties, testTypes } from './utilities';

// Fail if there is any error on client
export default async function checkErrors(): Promise<void> {
    const { error } = await t.getBrowserConsoleMessages();

    await t.expect(error[0]).notOk();
}

const url = `${domainUrl}/page?mock=all-modules&theme=fabrikam`;

fixture('All modules tests').page(url);

test.skip
    .meta(metaDataProperties.TestType, testTypes.BVT)
    ('Validate module render', async (testController: TestController) => {

        // Validate Navigation Menu module render
        const navigationMenuModule = Selector('#renderPage .navigation-menu');
        await testController.expect(navigationMenuModule.exists).eql(true, 'Navigation-menu: Could not find area.');
        await testController.expect(navigationMenuModule.find('.dropdown:nth-child(1) button').exists).eql(true, 'Navigation-menu: Could not find Navigation dropdown button.');

        // Validate Feature module render
        const featureModule = Selector('#renderPage .feature');
        await testController.expect(featureModule.exists).eql(true, 'Could not find Feature area');
        await testController.expect(featureModule.find('.feature-image-right').exists).eql(true, 'Feature: Could not find product image.');
        await testController.expect(featureModule.find('.feature-heading').exists).eql(true, 'Feature: Could not find product Heading or title.');
        await testController.expect(featureModule.find('.feature-paragraph').exists).eql(true, 'Feature: Could not find product paragraph.');
        await testController.expect(featureModule.find('.feature-cta-layer a').exists).eql(true, 'Feature: Could not find CTA.');

        // Validate carousel module render
        const carouselModule = Selector('#renderPage .carousel');
        await testController.expect(carouselModule.exists).eql(true, 'Carousel: Could not find carousel area.');
        await testController.expect(carouselModule.find('.carousel-inner').exists).eql(true, 'Carousel: Could not find carousel items.');
        await testController.expect(carouselModule.find('.carousel-control-prev').exists).eql(true, 'Carousel: Could not find carousel previous control link button.');
        await testController.expect(carouselModule.find('a.carousel-control-next').exists).eql(true, 'Carousel: Could not find carousel next cpntrol link button.');

        // Validate content-placement render
        const contentPlacementModule = Selector('#renderPage .content-placement');
        await testController.expect(contentPlacementModule.exists).eql(true, 'Content-placement: Could not find content placement area.');
        await testController.expect(contentPlacementModule.find('.content-placement-item img').exists).eql(true, 'Content-placement: Could not find content placement item Image.');
        await testController.expect(contentPlacementModule.find('.content-card-body .content-heading').exists).eql(true, 'Content-placement: Could not find content placement Heading or contens.');
        await testController.expect(contentPlacementModule.find('.content-card-action a.link').exists).eql(true, 'Content-placement: Could not find Shop Now CTA');
        await testController.expect(contentPlacementModule.find('.content-card-action a.link').innerText).eql('Shop Now', 'Content-placement: Shop Now text does not match');
    });