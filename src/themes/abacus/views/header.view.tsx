/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// import { IHeaderViewProps } from '@msdyn365-commerce-modules/header/dist/types/modules/header';
import { IHeaderViewProps } from '@msdyn365-commerce-modules/header/dist/types/modules/header/header';
import { Module, Node } from '@msdyn365-commerce-modules/utilities';
import * as React from 'react';

const headerView: React.FC<IHeaderViewProps> = props => {
    const {
        HeaderTag,
        HeaderContainer,
        HeaderTopBarContainer,
        MobileMenuContainer,
        MobileMenuBodyContainer,
        MobileMenuLinksContainer,
        Divider
    } = props;
    return (
        <Module {...HeaderTag}>
            <Node {...HeaderContainer}>
                <Node {...HeaderTopBarContainer}>
                    <div className='col-12'>
                        {props.navIcon}
                    </div>
                    <div className='row'>
                        <div className='col-md-4'/>
                        <div className='col-md-4'>{props.logo}</div>
                        <div className='col-md-4'>
                            {_renderDesktopAccountBlock(props)}
                            {props.wishListIconDesktop}
                            {_renderReactFragment(props.search)}
                            <Node {...Divider} />
                            {props.cartIcon}
                        </div>
                    </div>
                </Node>
                <Node {...MobileMenuContainer}>
                    <Node {...MobileMenuBodyContainer}>
                        { props.MobileMenuHeader }
                        {_renderReactFragment(props.menuBar)}
                        <Node {...MobileMenuLinksContainer}>
                            { props.accountLinks ? props.accountLinks.map(link => link): false }
                            { props.wishListIconMobile }
                            { props.signInLink }
                            { props.signOutLink }
                        </Node>
                    </Node>
                </Node>
                <div className=''>
                {/* sticky-header */}
                   <div className='header-container'>
                        {_renderReactFragment(props.menuBar)}
                   </div>
                </div>
            </Node>
        </Module>
    );
};

function _renderDesktopAccountBlock(props: IHeaderViewProps): JSX.Element | null {
    const {
        AccountInfoDropdownParentContainer,
        AccountInfoDropdownPopoverConentContainer,
        accountInfoDropdownButton,
        signOutLink,
        signInLink,
        accountLinks,
    } = props;

    if (AccountInfoDropdownParentContainer) {
        if (AccountInfoDropdownPopoverConentContainer) {
            return (
                <Node {...AccountInfoDropdownParentContainer}>
                    {accountInfoDropdownButton}
                    <Node {...AccountInfoDropdownPopoverConentContainer}>
                        { accountLinks ? accountLinks.map(link => link): false }
                        {signOutLink}
                    </Node>
                </Node>
            );
        } else if (signInLink) {
            return (
                <Node {...AccountInfoDropdownParentContainer}>
                    {signInLink}
                </Node>
            );
        }
    }

    return null;
}

function _renderReactFragment(items: React.ReactNode[]): JSX.Element | null {
    return (
        <React.Fragment>
            {items && items.length
                ? items.map((slot: React.ReactNode, index: number)=> {
                      return <React.Fragment key={index}>{slot}</React.Fragment>;
                  })
                : null}
        </React.Fragment>
    );
}

export default headerView;