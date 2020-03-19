/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Module, Node } from '@msdyn365-commerce-modules/utilities';
import * as React from 'react';
import { ICheckoutViewProps, ILineItem, ILineItemDeliveryGroup, ILineItems, IOrderSummary, IPickUpAtStore } from '@msdyn365-commerce-modules/checkout/dist/types';

export const PickUpAtStoreComponent: React.FC<IPickUpAtStore> = ({ PickUpAtStore, label, location }) => (
    <Node {...PickUpAtStore}>
        {label}
        {location}
    </Node>
);

export const LineItemComponent: React.FC<ILineItem> = ({ LineItem, item, pickUpAtStore }) => (
    <Node {...LineItem}>
        {item}
        {pickUpAtStore && <PickUpAtStoreComponent {...pickUpAtStore} />}
    </Node>
);

export const LineItemGroupComponent: React.FC<ILineItemDeliveryGroup> = ({ LineItemDeliveryGroup, LineItemList, heading, lineItems }) => (
    <Node {...LineItemDeliveryGroup}>
        {heading}
        <Node {...LineItemList}>
            {lineItems.map(lineItem => (
                <LineItemComponent key={lineItem.LineId} {...lineItem} />
            ))}
        </Node>
    </Node>
);

export const LineItemsComponent: React.FC<ILineItems> = ({ LineItems, Header, heading, editLink, itemsForPickup, itemsForShip }) => (
    <Node {...LineItems}>
        <Node {...Header}>
            {heading}
            {editLink}
        </Node>
        {itemsForPickup && <LineItemGroupComponent {...itemsForPickup} />}
        {itemsForShip && <LineItemGroupComponent {...itemsForShip} />}
    </Node>
);

const OrderSummaryComponent: React.FC<IOrderSummary> = ({ heading, lines }) => (
    <div className='msc-order-summary-wrapper'>
        {heading}
        <div className='msc-order-summary__items'>
            {lines && (
                <>
                    {/* {lines.subtotal} */}
                    {/* {lines.shipping} */}
                    {/* {lines.tax} */}
                    {/* {lines.totalDiscounts} */}
                    {/* {lines.loyalty} */}
                    {/* {lines.giftCard} */}
                    {lines.orderTotal}
                </>
            )}
    </div>
    </div>
);

const CheckoutView: React.FC<ICheckoutViewProps> = props => {
    const {
        canShow,
        checkoutProps,
        headerProps,
        bodyProps,
        mainProps,
        mainControlProps,
        sideProps,
        sideControlFirstProps,
        sideControlSecondProps,
        loading,
        alert,
        title,
        guidedForm,
        orderSummary,
        lineItems,
        placeOrderButton,
        keepShoppingButton
    } = props;
    return (
        <Module {...checkoutProps}>
            <Node {...headerProps}>{title}</Node>
            <Node {...bodyProps}>
                {loading}
                {alert}
                {canShow && (
                    <>
                        <Node {...mainProps}>
                            {guidedForm}
                            <Node {...mainControlProps}>
                                {placeOrderButton}
                                {keepShoppingButton}
                            </Node>
                        </Node>
                        <Node {...sideProps}>
                            {orderSummary && <OrderSummaryComponent {...orderSummary} />}
                            <Node {...sideControlFirstProps}>
                                {placeOrderButton}
                                {keepShoppingButton}
                            </Node>
                            {lineItems && <LineItemsComponent {...lineItems} />}
                            <Node {...sideControlSecondProps}>
                                {placeOrderButton}
                                {keepShoppingButton}
                            </Node>
                        </Node>
                    </>
                )}
            </Node>
        </Module>
    );
};

export default CheckoutView;
