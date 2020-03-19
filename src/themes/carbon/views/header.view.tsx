/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// import { IHeaderViewProps } from '@msdyn365-commerce-modules/header/dist/types/modules/header';
import { IHeaderViewProps } from '@msdyn365-commerce-modules/header/dist/types/modules/header/header';
import { Module, Node } from '@msdyn365-commerce-modules/utilities';
import { getUrlSync } from '@msdyn365-commerce/core';
import * as React from 'react';

const headerView: React.FC<IHeaderViewProps> = props => {
  const [scrollClass, setScrollClass] = React.useState<boolean>(false);
  /*React.useEffect(()=> {
    window.addEventListener('scroll', () => {
      _mainMenuScroll(scrollClass, setScrollClass);
    });
  },              []);*/
  window.addEventListener('scroll', () => {
    _mainMenuScroll(scrollClass, setScrollClass);
  });
  const {
    HeaderTag,
    HeaderContainer,
    HeaderTopBarContainer,
    MobileMenuContainer,
    MobileMenuBodyContainer,
    MobileMenuLinksContainer,
    Divider
  } = props;
  const aboutUrl = getUrlSync('about', props.context.actionContext);
  const ourStoreUrl = getUrlSync('our-store', props.context.actionContext);
  // const faqUrl = getUrlSync('', props.context.actionContext);
  const contactUrl = getUrlSync('contact', props.context.actionContext);
  const wishlistUrl = getUrlSync('wishlist', props.context.actionContext);

  const headerClass = scrollClass ? 'sticky-header' : '';
  console.log('ScrollClass: ',scrollClass, headerClass);
  return (
    <Module {...HeaderTag}>
      <div className='visi-header'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-7 col-md-6'>
              <ul className='visi-header-nav'>
                <li><a href={aboutUrl}>About</a></li>
                <li><a href={ourStoreUrl}>Our Stores</a></li>
                {/*<li><a href={faqUrl}>FAQ's</a></li>*/}
                <li><a href={contactUrl}>Contact</a></li>
              </ul>
            </div>
            <div className='col-lg-5 col-md-6'>
              <ul className='visi-header-right-nav'>
                <li><a href={wishlistUrl}><i className='wishlist-icon' />Wishlist</a></li>
                {/*<li><a href='/'>Compare <i className='fa-balance-scale'/></a></li>
                <li>
                  <div className='visi-languages-list'>
                    <select>
                      <option value='1'>Eng</option>
                      <option value='2'>Ger</option>
                      <option value='3'>Span</option>
                    </select>
                  </div>
                </li>*/}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={scrollClass ? 'visi-main-header sticky-header' : 'visi-main-header'}>
        <Node {...HeaderContainer}>
          <Node {...HeaderTopBarContainer}>
            {props.navIcon}
            {props.logo}
            {_renderReactFragment(props.menuBar)}
            {_renderReactFragment(props.search)}
            <Node {...Divider} />
            {_renderDesktopAccountBlock(props)}
            <Node {...Divider} />
            {props.cartIcon}
          </Node>
          <Node {...MobileMenuContainer}>
            <Node {...MobileMenuBodyContainer}>
              {props.MobileMenuHeader}
              {_renderReactFragment(props.menuBar)}
              <Node {...MobileMenuLinksContainer}>
                {props.accountLinks ? props.accountLinks.map(link => link): false}
                {props.wishListIconMobile}
                {props.signInLink}
                {props.signOutLink}
              </Node>
            </Node>
          </Node>
        </Node>
      </div>
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
            {accountLinks ? accountLinks.map(link => link): false}
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

function _mainMenuScroll(classState: boolean, setClassState: React.Dispatch<React.SetStateAction<boolean>>): void {
  if ((window.scrollY.valueOf() || document.body.scrollTop) >= 40) {
      if (classState !== true) {
        setClassState(true);
      }
  } else if ((window.scrollY.valueOf() || document.body.scrollTop) < 40) {
    setClassState(false);
  }
}

export default headerView;