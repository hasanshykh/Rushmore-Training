/**
 * Copyright (c) 2018 Microsoft Corporation
 */
import * as React from 'react';
import { IDropdownProps } from './';

type IDropdownState = {
    /**
     * @friendlyName selectedIndex
     * @description selected index
     */
    selectedIndex: string;
};

/**
 *
 * DropDown component
 * @extends {React.PureComponent<IDropdownProps, IDropdownState>}
 */
export class Dropdown extends React.PureComponent<IDropdownProps, IDropdownState> {
    private selectMenu: React.RefObject<HTMLSelectElement> = React.createRef<HTMLSelectElement>();

    constructor(props: IDropdownProps, state: IDropdownState) {
        super(props);
        this.state = {
            selectedIndex: ''
        };
    }

    public componentDidMount(): void {
        if (this.selectMenu.current) {
            this.selectMenu.current.selectedIndex = 0;
        }
    }

    public render(): JSX.Element {
        const {dropdownId, dropdownList, dropdownName, dropdownToggleName} = this.props;

        return (
            <select
                id={`msc-dropdown__entry-${dropdownId}`}
                ref={this.selectMenu}
                aria-label={dropdownName}
                className='msc-dropdown__select'
                onChange={this._onChanged}
            >
                <option value='' aria-selected={this.state.selectedIndex === ''} selected={this.state.selectedIndex === ''} hidden disabled>{dropdownToggleName}</option>
                {dropdownList.map(
                    (item: string, id: number) => item && <option value={id} key={id} selected={this.state.selectedIndex === id.toString()} aria-selected={this.state.selectedIndex === id.toString()}>{item}</option>
                )}
            </select>
        );
    }

    private _onChanged = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({selectedIndex: event.target.value});

        if (this.props.onChange) {
            await this.props.onChange({
                dropdownId: this.props.dropdownId,
                selectId: event.target.value,
                selectedValue: event.target.innerText
            });
        }
    };
}