import * as React from 'react';

import { IBuyboxViewProps } from '@msdyn365-commerce-modules/buybox/dist/types';

export const BuyboxProductConfigureAlt: React.FC<IBuyboxViewProps> = (props) => {
    const {
        data: {
            productDimensions: { result: productDimensions },
        }
    } = props;

    const generateOnClick = (id: number, valueId: string) => {
        return async () => {
            await props.callbacks.dimensionSelectedAsync(id, valueId);
        };
    };

    return (
        <div>
            {productDimensions ? productDimensions.map((dimension, i) => {
                const swatchName = props.callbacks.getDropdownName(dimension.DimensionTypeValue, props.resources).toLowerCase();
                return (
                    <div className='custom-swatch-wrap' key={i}>
                        <div className='swatch-heading'>
                            {props.callbacks.getDropdownName(dimension.DimensionTypeValue, props.resources)}
                        </div>
                        {dimension.DimensionValue && dimension.DimensionValue.Value ? (
                            <div>
                                Selected: <span>{dimension.DimensionValue.Value}</span>
                            </div>
                        ) : false}
                        <ul className={`custom-swatches ${swatchName}-swatch`}>
                            {dimension.DimensionValues ? dimension.DimensionValues.map((dimensionValue, index) => {
                                const dimensionItemValue = dimensionValue.Value!.toString();
                                const selectedValue = dimension.DimensionValue && dimension.DimensionValue.Value || 'not available';
                                const isActive = selectedValue === dimensionValue.Value;
                                return (
                                    <li
                                        key={index}
                                        {...getColorCode(dimensionItemValue, dimension.DimensionTypeValue)}
                                        className={isActive ? 'selected' : ''}
                                        onClick={generateOnClick(dimension.DimensionTypeValue, index.toString())}
                                        role='button'
                                    >
                                        {/*Note: will likely eventually update generateOnClick so you can pass in dimensionValue.RecordId instead of the index*/}
                                        <button>{dimensionValue.Value}</button>
                                    </li>
                                );
                            }) : false}
                        </ul>
                    </div>

                );
            }) : false}
        </div>
    );
};

const getColorCode = (item: string, labelId: number) => {
    let styleAttribute = {};
    if (labelId === 1) {
        const itemVal = item.toLowerCase().replace(/\s+/g, '');
        const colorCode = colorHexMap[itemVal];
        styleAttribute = {
            style: {
                backgroundColor: colorCode
            }
        };
    }
    return styleAttribute;
};

const colorHexMap: Object = {
    purple: '#800080',
    crimson: '#dc143c',
    silver: '#c0c0c0',
    oak: '#806517',
    sangria: '#7e3817',
    green: '#008000',
    oceanblue: '#4f42b5',
    salmon: '#fa8072',
    pink: '#ffc0cb',
    lightgrey: '#d3d3d3',
    navy: '#000080',
    bluewash: '#368bc1',
    darkblue: '#00008b',
    grey: '#808080',
    red: '#ff0000',
    rosewood: '#65000B',
    walnut: '#5d432c',
    iceblue: '#d6ecef',
    brown: '#7b241c',
    violet: '#ee82ee',
    darkwash: '#ccccff',
    sandstone: '#786d5f',
    unripe: '#a4c639',
    maroon: '#800000',
    sage: '#77815c',
    dark: '#000000',
    magenta: '#ff00ff',
    dgrey: '#737373',
    black: '#000000',
    wornblue: '#14568c',
    lightblue: '#add8e6',
    blue: '#0000ff',
    yellow: '#ffff00',
    cherry: '#de3163',
    white: '#fcfff9',
    skyblue: '#87ceeb',
    blueplaid: '#419da9',
    darkgrey: '#737373',
    steelgrey: '#e6e6e6',
    tan: '#d2b48c',
    orange: '#ffa500',
    deepnvy: '#00004d'
};