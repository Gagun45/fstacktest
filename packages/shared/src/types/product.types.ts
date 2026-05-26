import { IPaginatedResponse } from "./general.types";

export const PRODUCT_TYPES = [
  { value: "KEYBOARD", label: "Keyboard", slug: "keyboard" },
  { value: "SWITCHES", label: "Switches", slug: "switches" },
  { value: "KEYCAPS", label: "Keycaps", slug: "keycaps" },
] as const;

export type IProductType = (typeof PRODUCT_TYPES)[number]["value"];

export interface IBaseProduct {
  id: number;
  title: string;
  description: string;
  type: IProductType;
  price: number;
  isInStock: boolean;
  images: IExistingImage[];
  seller: {
    id: number;
    username: string;
  };
}

export interface IExistingImage {
  id: number;
  url: string;
  key: string;
  order: number;
}

export type IProductCard = IBaseProduct & {
  rating: number;
  totalReviews: number;
};

export type IProductDetails = IProductCard & {
  keyboard: IKeyboard | null;
  switches: ISwitches | null;
  keycaps: IKeycaps | null;
};

export type IMyProduct = IProductDetails & {
  totalSold: number;
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
