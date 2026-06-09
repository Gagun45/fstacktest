import { INotification } from "./notification.types";
import { IMyProduct, IProductCard } from "./product.types";

export type FileOptionsType = {
  maxSize: number;
  allowedMimeTypes: string[];
};

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
export interface IPaginatedResponse<T> {
  data: T[];
  pagination: IPagination;
}

export interface IMessageResponse {
  message: string;
}

export interface IFavoritedResponse {
  isFavorited: boolean;
}

export interface INotificationsResponse {
  data: IPaginatedResponse<INotification>;
  unreadCount: number;
}

export type IDashboardResponse = IPaginatedResponse<IProductCard>;

export type IProductsResponse = IPaginatedResponse<IProductCard>;
export type IMyProductsResponse = IPaginatedResponse<IMyProduct>;

export type IAscDescType = "asc" | "desc";
