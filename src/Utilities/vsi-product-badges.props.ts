import { ProductPrice } from '@msdyn365-commerce/retail-proxy/dist/Entities/CommerceTypes.g';

export interface IPriceRange {
  startingValue: number;
  endingValue?: number;
}

export interface IPrice {
  BasePrice?: number;
  AdjustedPrice?: number;
  CustomerContextualPrice?: number;
}
export interface IVsiProductBadgesProps {
  moduleType?: string;
  price?: IPrice;
  productPrice?: ProductPrice;
  rating?: number;
}