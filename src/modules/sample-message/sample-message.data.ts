import { AsyncResult } from '@msdyn365-commerce/core';
import { ISampleStateData } from '../../actions/sample-state';

export interface ISampleMessageData {
    sampleState: AsyncResult<ISampleStateData>;
}