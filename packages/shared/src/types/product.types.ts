import { IPaginatedResponse } from "./general.types";

export type IProductsResponse = IPaginatedResponse<IProductCard>;
export type IMyProductsResponse = IPaginatedResponse<IMyProduct>;

export const PRODUCT_TYPES = ["KEYBOARD", "SWITCHES", "KEYCAPS"] as const;

export type IProductType = (typeof PRODUCT_TYPES)[number];

export interface IBaseProduct {
  id: number;
  title: string;
  description: string;
  type: IProductType;
  price: number;
  stock: number;
  images: {
    id: number;
    url: string;
    isMain: boolean;
  }[];
  seller: {
    id: number;
    username: string;
  };
}
export type IProductCard = IBaseProduct & {
  rating: number;
  totalReviews: number;
};

export type IMyProduct = IProductCard & {
  totalSold: number;
  lowStockThreshold: number;
};

export type IProductDetails = IProductCard & {
  keyboard: IKeyboard | null;
  switches: ISwitches | null;
  keycaps: IKeycaps | null;
};

export interface IKeyboard {
  id: number;
  productId: number;
  layout: string;
  caseMaterial: string;
  isHotswap: boolean;
}

export interface ISwitches {
  id: number;
  productId: number;
  switchType: string;
  actuationForce: number;
  brand: string;
}

export interface IKeycaps {
  id: number;
  productId: number;
  profile: string;
  material: string;
}
