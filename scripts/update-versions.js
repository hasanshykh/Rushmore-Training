const fs = require('fs');
const cp = require('child_process');
const path = require('path');
const { promisify } = require('util');
const semver = require('semver');
const yargs = require('yargs').argv;

const exec = promisify(cp.exec);

/**
 * List of packages we care about setting alpha resolutions on
 */
const packages = [
    '@msdyn365-commerce-modules/core-components',
    '@msdyn365-commerce/action-internal',
    '@msdyn365-commerce/bootloader',
    '@msdyn365-commerce/build-scripts-internal',
    '@msdyn365-commerce/cache-internal',
    '@msdyn365-commerce/cli-internal',
    '@msdyn365-commerce/cli-template-internal',
    '@msdyn365-commerce/core',
    '@msdyn365-commerce/core-internal',
    '@msdyn365-commerce/definition-generator-internal',
    '@msdyn365-commerce/release-scripts',
    '@msdyn365-commerce/runtime-internal',
    '@msdyn365-commerce/telemetry-internal',
    '@msdyn365-commerce/tslint-rules',
    '@msdyn365-commerce/theming-internal',
    '@msdyn365-commerce/utilities-internal',
    '@msdyn365-commerce/zone-ts',
    'create-msdyn365-commerce-package'
];

/**
 * List of module packages to set alphas for
 */
const modulesPackages = [
    '@msdyn365-commerce-modules/starter-pack',
    '@msdyn365-commerce-modules/fabrikam-design-kit'
]


/**
 * Gets list of versions for a set of packages and returns the latest - alpha or latest
 */
const getLatestAlphas = async (tag = 'latest') => {

    if(yargs.s) {
        let versionPromises = modulesPackages.map(async package => {
            const execPromiseResult = await exec(`yarn info ${package} dist-tags --json`);
            let distTags;
            try {
                distTags = JSON.parse(execPromiseResult.stdout).data;
            } catch(e) {
                console.error(`Error throw in JSON parse`, e, '\r\n', execPromiseResult);
            }
            if (distTags) {
                if (distTags[tag] && distTags.latest) {
                    console.info(`found [${tag}] - ${distTags[tag]} and [latest] - ${distTags.latest}`);
                    // Force and alpha or an rc for modules rather than relying on semver, get the package with the lastalphapublish or lastrcpublishtag and force that version
                    return {
                        package,
                        version:  distTags[tag]
                    };
                }
                console.error(`Did not find ${tag}`);
            }
        });
        return (await Promise.all(versionPromises)).filter(Boolean);
    } else {
        let versionPromises = packages.map(async package => {
            const execPromiseResult = await exec(`yarn info ${package} dist-tags --json`);
            let distTags;
            try {
                distTags = JSON.parse(execPromiseResult.stdout).data;
            } catch(e) {
                console.error(`Error throw in JSON parse`, e, '\r\n', execPromiseResult);
            }
            if (distTags) {
                if (distTags[tag] && distTags.latest) {
                    console.info(`found [${tag}] - ${distTags[tag]} and [latest] - ${distTags.latest}`);
                    return {
                        package,
                        version: semver.gt(distTags[tag], distTags.latest, true) ? distTags[tag] : distTags.latest
                    };
                }
                console.error(`Did not find ${tag}`);
            }
        });
        return (await Promise.all(versionPromises)).filter(Boolean);
    }
};

/**
 * Updates package.json dependencies with the latest dependencies
 * @param {Object} deps
 */
const setDependencies = deps => {
    const pathToPackageJson = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(pathToPackageJson).toString());
    Object.keys(deps).forEach(dep => {
        console.log(dep, deps[dep]);
        if (packageJson.dependencies[dep]) {
            packageJson.dependencies[dep] = deps[dep];
        }
    })

    packageJson.resolutions = {
        ...packageJson.resolutions,
        ...deps
    }
    fs.writeFileSync(pathToPackageJson, JSON.stringify(packageJson, null, 4));
};

/**
 * Entry point
 */
const main = async (isDryRun, tag = 'latest') => {
    isDryRun && console.log(`[INFO] Dry run, not updating any package versions`);
    const versions = await getLatestAlphas(tag);
    console.log(`Will use the following package versions:`);
    console.table(versions);
    if (isDryRun) {
        return;
    }
    const newDependencyVersions = Array.from(versions.values()).reduce(
        (prev, package) => ({ ...prev, [package.package]: package.version }),
        {}
    );
    setDependencies(newDependencyVersions);
};

// is this a dry run?
const isDryRun = yargs.n !== undefined;
const tag = yargs.tag;

return main(isDryRun, tag);
