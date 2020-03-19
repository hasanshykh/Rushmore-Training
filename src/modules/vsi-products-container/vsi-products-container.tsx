/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import classnames from 'classnames';
import get from 'lodash/get';
import * as React from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { IVsiProductsContainerData } from './vsi-products-container.data';
import { IVsiProductsContainerProps } from './vsi-products-container.props.autogenerated';

export interface IVsiProductContainerState {
    activeTab: string;
}

/**
 *
 * VsiProductsContainer component
 * @extends {React.PureComponent<IVsiProductsContainerProps<IVsiProductsContainerData>, IVsiProductContainerState>}
 */
export default class VsiProductsContainer extends React.PureComponent<IVsiProductsContainerProps<IVsiProductsContainerData>, IVsiProductContainerState> {
    constructor(props: IVsiProductsContainerProps<IVsiProductsContainerData>) {
        super(props);
        this.state = { activeTab: '0' };
        this.onHandleToggle = this.onHandleToggle.bind(this);
    }

    public onHandleToggle(event: React.MouseEvent<HTMLElement>): void {
        const { activeTab } = this.state;
        const target = event.currentTarget as HTMLElement;
        const tabID = target.getAttribute('data-id');
        if (activeTab !== tabID) {
            this.setState({ activeTab: tabID || '0' });
        }
    }

    public render(): JSX.Element | null {
        const { slots } = this.props;
        const { activeTab } = this.state;

        if (!slots) {
            return null;
        }

        const contentSlots = slots.content ? slots.content : [];
        console.log('props form product container module', this.props);
        return (
            <div {...this.props.renderModuleAttributes(this.props)} id={this.props.id}>
                <Nav tabs>
                    {contentSlots.map((item: React.ReactNode, i) => {
                        return <NavItem tabId={i.toString()} key={i}>
                            <NavLink
                                className={classnames({ active: activeTab === i.toString() })}
                                onClick={this.onHandleToggle}
                                data-id={i.toString()}
                            >
                                {get(item, 'props.config.heading.text')}
                            </NavLink>
                        </NavItem>;
                    }

                    )}
                </Nav>
                <TabContent activeTab={activeTab}>
                    {contentSlots.map((children: React.ReactNode, index: number) => {
                        return (
                            <TabPane tabId={index.toString()} key={index}>
                                {children}
                            </TabPane>
                        );
                    })}
                </TabContent>
            </div>
        );
    }
}
