import * as React from 'react';

import { INodeProps } from '@msdyn365-commerce-modules/utilities';
import { ProductDimensionFull } from '@msdyn365-commerce/commerce-entities';
import { IActionContext } from '@msdyn365-commerce/core';
import { SimpleProduct } from '@msdyn365-commerce/retail-proxy';

import { IBuyboxCallbacks, IBuyboxData, IBuyboxProps, IBuyboxResources, IBuyboxState } from '@msdyn365-commerce-modules/buybox';
// import { Dropdown, IDropdownOnSelectionChangeNotification } from './dropdown';
import { ILabelOnSelectionChangeNotification, Label } from './label';

export interface IBuyboxProductConfigureProps {
    product: SimpleProduct;
    productDimensions: ProductDimensionFull[];
    resources: IBuyboxResources;
    channelId: number;
    actionContext: IActionContext;
    errors: { [configureId: string]: string | undefined };

    dimensionChanged?(newValue: number): void;
}

export interface IVsiBuyboxProductConfigureDropdownViewProps {
    ContainerProps: INodeProps;
    LabelContainerProps: INodeProps;

    heading: React.ReactNode;
    errors?: React.ReactNode;

    select: React.ReactNode;
}

export interface IVsiBuyboxProductConfigureViewProps {
    ContainerProps: INodeProps;

    dropdowns: IVsiBuyboxProductConfigureDropdownViewProps[];
}

export function getVsiBuyboxProductConfigure(props: IBuyboxProps<IBuyboxData>, state: IBuyboxState, callbacks: IBuyboxCallbacks): IVsiBuyboxProductConfigureViewProps | undefined {
    const {
        data: {
            product: { result: product },
            productDimensions: { result: productDimensions },
        },
        resources
    } = props;

    const
        {
            errorState: {
                configureErrors,
            }
        } = state;

    const
        {
            getDropdownName
        } = callbacks;

    if (!product || !productDimensions) {
        return undefined;
    }

    const onChanged = async (notification: ILabelOnSelectionChangeNotification) => _onChanged(notification, callbacks.dimensionSelectedAsync);

    const dropdowns = productDimensions.map(productDimensionFull => _mapProductDimensionFullToDropdownViewProps(productDimensionFull, resources, configureErrors, getDropdownName, onChanged));

    if (!dropdowns || dropdowns.length === 0) {
        return undefined;
    }

    return {
        ContainerProps: {
            className: 'ms-buybox__configure'
        },
        dropdowns: dropdowns
    };
}

const _onChanged = async (
    notification: ILabelOnSelectionChangeNotification,
    dimensionChanged: (newValue: number, selectedDimensionValue: string) => Promise<void>,
): Promise<void> => {
    await dimensionChanged(+notification.labelId, notification.selectId);
};

const _mapProductDimensionFullToDropdownViewProps =
    (
        productDimensionFull: ProductDimensionFull,
        resources: IBuyboxResources,
        configureErrors: { [configureId: string]: string | undefined },
        getDropdownName: (dimensionType: number, resources: IBuyboxResources) => string,
        dropdownCallback: (notification: ILabelOnSelectionChangeNotification) => Promise<void>
    ): IVsiBuyboxProductConfigureDropdownViewProps => {
        const dropdownName = getDropdownName(productDimensionFull.DimensionTypeValue, resources);
        const dropdownId = productDimensionFull.DimensionTypeValue.toString();
        const dropdownToggleName = resources.selectDimensionFormatString.replace('{0}', dropdownName.toLocaleLowerCase());
        const dropdownList = productDimensionFull.DimensionValues
            ? productDimensionFull.DimensionValues.map(dimensionValue => {
                return dimensionValue.Value || '';
            })
            : [];
        const errorMessage = configureErrors[dropdownId];
        const vsiDropdownName = dropdownName.toLowerCase();
        /*console.log('productDimensionFull: ',productDimensionFull);
        const list: JSX.Element[] = dropdownList.map((dimensionValue) => {
            console.log('DimenstionValue: ',dimensionValue);
            return (
                <label>
                    <input type='radio' name={`${vsiDropdownName}swatch`} value={dimensionValue} /> {dimensionValue}
                </label>
            );
        });*/

        return {
            ContainerProps: {
                className: 'ms-buybox__dropdown'
            },
            LabelContainerProps: {
                tag: 'label',
                className: 'ms_buybox__dropdown-quantity-label',
                htmlFor: `ms-buybox__dropown-quantity-input-${dropdownId}`
            },
            errors: errorMessage && (
                <span className='msc-alert msc-alert-noborder msc-alert-danger'>
                    <span className='msi-exclamation-triangle' aria-hidden='true' />
                    <span>{errorMessage}</span>
                </span>
            ),
            heading: (
                <div>{dropdownName}</div>
            ),
            select: (
                <>
                    <Label
                        labelId={dropdownId}
                        labelName={vsiDropdownName}
                        labelToggleName={dropdownToggleName}
                        labelList={dropdownList}
                        onChange={dropdownCallback}
                    />
                    {/*<Dropdown
                dropdownId={dropdownId}
                dropdownName={dropdownName}
                dropdownToggleName={dropdownToggleName}
                dropdownList={dropdownList}
                onChange={dropdownCallback}
            />*/}
                </>
            )
        };
    };