
export const domainUrl = (process && process.env && process.env.NodeTestUri) || 'http://localhost:4000';

export const enum metaDataProperties {
    TestType = 'testtype'
}

export const enum testTypes {
    BVT = 'bvt',
    DVT = 'dvt',
}
