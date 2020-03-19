/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IPromoBannerViewProps } from '@msdyn365-commerce-modules/promo-banner/dist/types/modules/promo-banner/promo-banner';
import { Module, Node } from '@msdyn365-commerce-modules/utilities';
import * as React from 'react';

const PromoBannerView: React.FC<IPromoBannerViewProps> = props => {
    const {
        promoBannerProps,
        contentProps,
        closeButton,
        bannerMessages,
        PromoBannerTextProps,
        PromoBannerLinksProps,
        CarouselProps
    } = props;

    const slides = bannerMessages && bannerMessages.map((message, index)=> {
        return (
            <Node {...contentProps} key={index}>
                {message.text && <Node {...PromoBannerTextProps} text={message.text} />}
                {message.links && message.links.length > 0 && <Node {...PromoBannerLinksProps} links={message.links} />}
            </Node>
        );
    });

    return (
        <Module {...promoBannerProps}>
            <div className='container'>
                <div className='promo-alert'>
                    <Node {...CarouselProps} items={slides} />
                    {closeButton}
                </div>
            </div>
        </Module>
    );
};
export default PromoBannerView;
