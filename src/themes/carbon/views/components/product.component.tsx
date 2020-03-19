import { getProductPageUrlSync } from '@msdyn365-commerce-modules/retail-actions';
import { format } from '@msdyn365-commerce-modules/utilities';
import { PriceComponent, RatingComponent } from '@msdyn365-commerce/components';
// tslint:disable-next-line: no-duplicate-imports
import { IComponent, IComponentProps, ICoreContext, IGridSettings, IImageData, IImageSettings, Image, msdyn365Commerce } from '@msdyn365-commerce/core';
import { ProductPrice, ProductSearchResult } from '@msdyn365-commerce/retail-proxy';
import React from 'react';
import VsiProductBadges from '../../../../Utilities/vsi-product-badges';

export interface IProductComponentProps extends IComponentProps<{ product?: ProductSearchResult }> {
    className?: string;
    imageSettings?: IImageSettings;
    savingsText?: string;
    freePriceText?: string;
    originalPriceText?: string;
    currentPriceText?: string;
    ratingAriaLabel?: string;
}

export interface IProductComponent extends IComponent<IProductComponentProps> { }

const PriceComponentActions = {
};

const ProductCardOne: React.FC<IProductComponentProps> = ({
    data,
    context,
    imageSettings,
    savingsText,
    freePriceText,
    originalPriceText,
    currentPriceText,
    ratingAriaLabel,
    typeName,
    id
}) => {
    const { product } = data;
    if (!product) {
        return null;
    }
    // console.log('productOne', product);
    const price: ProductPrice = {
        BasePrice: product.BasePrice || 0,
        AdjustedPrice: product.Price || 0,
        CustomerContextualPrice: product.Price || 0
    };

    const productUrl = getProductPageUrlSync(product.Name || '', product.RecordId, context && context.actionContext, undefined);
    return (
        <a href={productUrl} aria-label={renderLabel(product.Name, context.cultureFormatter.formatCurrency(product.Price), product.AverageRating, ratingAriaLabel)} className='msc-product'>
            <div className='msc-product__image position-relative'>
                {renderProductPlacementImage(imageSettings, context.request.gridSettings, product.PrimaryImageUrl, product.Name)}
                <VsiProductBadges price={price} moduleType='plp' rating={product.AverageRating} />
            </div>
            <div className='msc-product__details'>
                <h4 className='msc-product__title'>{product.Name}</h4>
                {renderPrice(context, typeName, id, product.BasePrice, product.Price, savingsText, freePriceText, originalPriceText, currentPriceText)}
                {renderDescription(product.Description)}
                {renderRating(context, typeName, id, product.AverageRating, product.TotalRatings, ratingAriaLabel)}
            </div>
        </a>
    );
};

function renderLabel(name?: string, price?: string, rating?: number, ratingAriaLabel?: string): string {
    let ratingLabel = '';

    name = name || '';
    price = price || '';

    if (rating) {
        const roundedRating = rating.toFixed(2);
        ratingLabel = format(ratingAriaLabel || '', roundedRating, '5');
    }

    return (`${name} ${price} ${ratingLabel}`);
}

function renderDescription(description?: string): JSX.Element | null {
    return <p className='msc-product__text'>{description}</p>;
}

function renderRating(context: ICoreContext, typeName: string, id: string, avgRating?: number, totalRatings?: number, ariaLabel?: string): JSX.Element | null {
    if (!avgRating) {
        return null;
    }

    const numRatings = totalRatings && totalRatings.toString() || undefined;

    return (
        <RatingComponent
            context={context}
            id={id}
            typeName={typeName}
            avgRating={avgRating}
            ratingCount={numRatings}
            readOnly={true}
            ariaLabel={ariaLabel || ''}
            data={{}}
        />
    );
}

function renderPrice(context: ICoreContext, typeName: string, id: string, basePrice?: number, adjustedPrice?: number, savingsText?: string, freePriceText?: string, originalPriceText?: string, currentPriceText?: string): JSX.Element | null {
    const price: ProductPrice = {
        BasePrice: basePrice,
        AdjustedPrice: adjustedPrice,
        CustomerContextualPrice: adjustedPrice
    };
    return (
        <PriceComponent
            context={context}
            id={id}
            typeName={typeName}
            data={{ price: price }}
            savingsText={savingsText}
            freePriceText={freePriceText}
            originalPriceText={originalPriceText}
        />
    );
}

function renderProductPlacementImage(imageSettings?: IImageSettings, gridSettings?: IGridSettings, imageUrl?: string, altText?: string): JSX.Element | null {
    if (!imageUrl || !gridSettings || !imageSettings) {
        return null;
    }
    const img: IImageData = {
        src: imageUrl,
        altText: altText ? altText : ''
    };
    const imageProps = {
        gridSettings: gridSettings,
        imageSettings: imageSettings
    };
    return (
        <Image {...img} {...imageProps} loadFailureBehavior='empty' />
    );
}

// @ts-ignore
export const ProductComponent: React.FunctionComponent<IProductComponentProps> = msdyn365Commerce.createComponent<IProductComponent>(
    'Product',
    { component: ProductCardOne, ...PriceComponentActions }
);

export default ProductCardOne;