import { ISampleStateData } from '../../actions/sample-state';
import { AsyncResult } from '@msdyn365-commerce/core';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface ISampleButtonData {
    sampleState: AsyncResult<ISampleStateData>;
}