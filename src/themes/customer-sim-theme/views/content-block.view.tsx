/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IContentBlockViewProps } from '@msdyn365-commerce-modules/content-block/dist/types/modules/content-block/content-block';
import { Module, Node } from '@msdyn365-commerce-modules/utilities';
import * as React from 'react';

const ContentBlockView: React.FC<IContentBlockViewProps> = props => {
    const { contentBlockContainer, imageContainer, detailsContainer, title, text, links, image } = props;
    return (
        <Module {...contentBlockContainer}>
            <Node {...imageContainer}>
                {image}
            </Node>
            <Node {...detailsContainer}>
                {title}
                {links}
                {text}
            </Node>
        </Module>
    );
};

export default ContentBlockView;
