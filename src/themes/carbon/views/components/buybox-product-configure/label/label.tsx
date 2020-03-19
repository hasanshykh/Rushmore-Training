/**
 * Copyright (c) 2018 Microsoft Corporation
 */
import * as React from 'react';
import { ILabelProps } from './';

type ILabelState = {
    /**
     * @friendlyName selectedIndex
     * @description selected index
     */
    selectedIndex: string;
};

/**
 *
 * Label component
 * @extends {React.PureComponent<ILabelProps, ILabelState>}
 */
export class Label extends React.PureComponent<ILabelProps, ILabelState> {
    // private selectMenu: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
    private colorHexMap:Object = {
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
        darkblue: '##00008b',
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
        yellow: '##ffff00',
        cherry: '#de3163',
        white: '#ffffff',
        skyblue: '#87ceeb',
        blueplaid: '#419da9',
        darkgrey: '#737373',
        steelgrey: '#e6e6e6',
        tan: '#d2b48c',
        orange: '#ffa500',
        deepnvy: '#00004d'
    };

    constructor(props: ILabelProps, state: ILabelState) {
        super(props);
        this.state = {
            selectedIndex: ''
        };
    }

    public componentDidMount(): void {
        /*if (this.selectMenu.current) {
            this.selectMenu.current = 0;
        }*/
    }

    public render(): JSX.Element {
        const { labelId, labelList, labelName } = this.props;// labelToggleName

        return (
            <>
            <div className={`swatch-wrap ${labelName}-swatch`}>
            {labelList.map(
                (item: string, id: number) => item &&
                    <label {...this._getColorCode(item, labelId)} className={this.state.selectedIndex === id.toString() ? 'selected': ''}>
                        <input
                            type='radio'
                            role='radio'
                            name={`${labelName}swatch`}
                            value={id}
                            checked={this.state.selectedIndex === id.toString()}
                            aria-checked={this.state.selectedIndex === id.toString()}
                            onChange={this._onChanged}
                        />
                        <span className='swatch-name'>{item}</span>
                    </label>
                )}
            </div>
            </>
            /*{labelList.map(
                (item: string, id: number) => item &&
                <option value={id} key={id} selected={this.state.selectedIndex === id.toString()} aria-selected={this.state.selectedIndex === id.toString()}>{item}</option>
            )}*/
            /*<select
                id={`msc-label__entry-${labelId}`}
                ref={this.selectMenu}
                aria-label={labelName}
                className='msc-label__select'
                onChange={this._onChanged}
            >
                <option value='' aria-selected={this.state.selectedIndex === ''} selected={this.state.selectedIndex === ''} hidden disabled>{labelToggleName}</option>
                {labelList.map(
                    (item: string, id: number) => item && <option value={id} key={id} selected={this.state.selectedIndex === id.toString()} aria-selected={this.state.selectedIndex === id.toString()}>{item}</option>
                )}
            </select>*/
        );
    }

    private _onChanged = async (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({selectedIndex: event.target.value});

        if (this.props.onChange) {
            await this.props.onChange({
                labelId: this.props.labelId,
                selectId: event.target.value,
                selectedValue: event.target.innerText
            });
        }
    };

    private _getColorCode = (item: string, labelId: string) => {
        let styleAttribute = {};
        if(labelId === '1') {
            const itemVal = item.toLowerCase().replace(/\s+/g, '');
            const colorCode = this.colorHexMap[itemVal];
            styleAttribute = {
                style: {
                    backgroundColor: colorCode
                }
            };
        }
        return styleAttribute;
    }
}