/**
 * Copyright (c) 2018 Microsoft Corporation
 */
import * as React from 'react';
import { IVsiProductBadgesProps } from './vsi-product-badges.props';

/**
 *
 * VsiProductBadges Component is used to add badges on products
 * @extends {React.PureComponent<IVsiProductBadgesProps>}
 */
class VsiProductBadges extends React.PureComponent<IVsiProductBadgesProps> {
  public render(): JSX.Element | null {
    const { moduleType } = this.props;

    switch (moduleType) {
      case 'plp': {
        return (
          <div className='badge-wrapper top-left'>
            {this._renderPlpDiscounts()}
            {this._renderPlpRating()}
          </div>
        );
      }

      case 'pdp': {
        return (
          <div className='badge-wrapper top-left'>
            {this._renderPdpDiscounts()}
            {this._renderPdpRating()}
          </div>
        );
      }
      default: null;
    }

    return null;
  }
  private _renderPlpDiscounts(): JSX.Element | null {
    const { price } = this.props;
    if (price) {
      const { BasePrice, CustomerContextualPrice } = price;
      let discount = 0;
      if (BasePrice && CustomerContextualPrice && BasePrice > CustomerContextualPrice) {
          const actualPercentage = Math.round((CustomerContextualPrice / BasePrice) * 100);
          discount = 100 - actualPercentage;
      }
      if (discount > 0) {
        return (
          <div className='plp-discount-badge'>
            {`-${discount}%`}
          </div>
        );
      }

    }
    return null;
  }
  private _renderPdpDiscounts(): JSX.Element | null {
    const { price } = this.props;
    if (price) {
      const { BasePrice, CustomerContextualPrice } = price;
      let discount = 0;
      if (BasePrice && CustomerContextualPrice && BasePrice > CustomerContextualPrice) {
        const actualPercentage = Math.round((CustomerContextualPrice / BasePrice) * 100);
        discount = 100 - actualPercentage;
    }
      if (discount > 0) {
      return (
        <div className='pdp-discount-badge'>
          {`-${discount}%`}
        </div>
      );
    }
    }
    return null;
  }
  private _renderPlpRating(): JSX.Element | null {
    const { rating } = this.props;
    const topRating = 4.3;
    if (rating && rating >= topRating) {
        return (
          <div className='plp-rating'>
            {`Top Rated`}
          </div>
        );
    }
    return null;
  }
  private _renderPdpRating(): JSX.Element | null {
    const { rating } = this.props;
    const topRating = 4.3;
    if (rating && rating >= topRating) {
        return (
          <div className='pdp-rating'>
            {`Top Rated`}
          </div>
        );
    }
    return null;
  }
}

export default VsiProductBadges;