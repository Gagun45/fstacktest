import { IDashboardEvent, IOwnEvent } from "./event.types";

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

export type IOwnEventsResponse = IPaginatedResponse<IOwnEvent>;

export type IDashboardResponse = IPaginatedResponse<IDashboardEvent>;

export type IAscDescType = "asc" | "desc";
