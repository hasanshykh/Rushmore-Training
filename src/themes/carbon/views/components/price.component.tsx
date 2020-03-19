import classnames from 'classnames';
import * as React from 'react';

/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */
import { IComponent, IComponentProps, msdyn365Commerce } from '@msdyn365-commerce/core';
import { ProductPrice } from '@msdyn365-commerce/retail-proxy';

export interface IPriceComponentProps extends IComponentProps<{price: ProductPrice}> {
    className?: string;
    savingsText?: string;
    freePriceText?: string;
    originalPriceText?: string;
    currentPriceText?: string;
}
export interface IPriceComponent extends IComponent<IPriceComponentProps> {
}

const PriceComponentActions = {
};

const Price: React.FC<IPriceComponentProps> = (props: IPriceComponentProps) => {
    // CustomerContextualPrice could be 0
    if (props.data.price.CustomerContextualPrice === undefined) {
        return null;
    }

    return (
        <span className={classnames('msc-price', props.className)}>
            {showStrikethroughPricing(props) ? renderCurrentPriceWithOriginalPrice(props) : renderCurrentPrice(props)}
        </span>
    );
};

const showStrikethroughPricing = (props: IPriceComponentProps) => {
    const originalPrice = getOriginalPrice(props);

    if (originalPrice && props.data.price.CustomerContextualPrice) {
        return originalPrice > props.data.price.CustomerContextualPrice;
    }

    return false;
};

const getOriginalPrice = (props: IPriceComponentProps) => {
    return Math.max(props.data.price.BasePrice || 0, props.data.price.TradeAgreementPrice || 0, props.data.price.AdjustedPrice || 0);
};

const renderCurrentPrice = (props: IPriceComponentProps): JSX.Element | undefined => {
    const initialPrice = formatCurrency(props, props.data.price.CustomerContextualPrice);
    return <span className='msc-price__actual' itemProp='price'>{initialPrice}</span>;
};

const formatCurrency = (props: IPriceComponentProps, price: number | undefined): string | undefined => {
    if (price === undefined) {
        return undefined;
    }

    if (price === 0 && props.freePriceText) {
        return props.freePriceText;
    }

    return props.context.cultureFormatter.formatCurrency(price);
};

const renderCurrentPriceWithOriginalPrice = (props: IPriceComponentProps): JSX.Element | null => {
    const originalPrice = getOriginalPrice(props);
    const initialPrice = formatCurrency(props, originalPrice);

    return (
        <>
            <span className='sr-only'> {props.originalPriceText} {initialPrice} {props.currentPriceText} {renderCurrentPrice(props)}</span>
            {/* <span className='msc-price__strikethrough' aria-hidden='true'>{initialPrice}</span> */}
            <span aria-hidden='true'>{renderCurrentPrice(props)}</span>
            {props.savingsText && <span className='msc-price__savings'>{props.savingsText}</span>}
        </>
    );
};

// // @ts-ignore
// export const PriceComponent: React.FunctionComponent<IPriceComponentProps> = msdyn365Commerce.createComponent<IPriceComponent>(
//     'Price',
//     { component: Price, ...PriceComponentActions }
// );

export default Price;