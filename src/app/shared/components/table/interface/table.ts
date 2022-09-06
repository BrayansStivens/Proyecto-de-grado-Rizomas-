import { Observable } from 'rxjs';

export enum CellType {
  LINK = 'LINK',
  DOUBLEDATA = 'DOUBLEDATA',
  ICON_TEXT = 'ICON_TEXT',
  STAR_RATE = 'STAR_RATE',
  ACTIONS = 'ACTIONS',
  IMAGES = 'IMAGES',
  HTML = 'HTML',
}

export enum SelectionStrategy {
  NONE = 'None',
  SINGLE = 'Single',
  MULTIPLE = 'Multiple',
}

export enum PaginationType {
  CLIENT = 'Client',
  SERVER_SIDE = 'ServerSide',
  NONE = 'None',
}

export type DataFetchFn = (
  pageSize: number,
  pageNumber: number
) => Observable<PaginationResponse>;

export interface Link {
  text: string;
  href: string;
  keyword: string;
}

export interface DoubleData {
  text1: string;
  text2: string;
  keyword: string;
}

export interface IconText {
  color: string;
  text: string;
  keyword: string;
  icon?: string;
}

export interface Images {
  url: string;
  text: string;
  keyword: string;
}

export interface StarRate {
  total: number;
  rate: number;
}

export interface Action {
  name: string;
  color: string;
  tooltip: string;
  disabled?: boolean;
}

export interface PaginationResponse {
  data: any[];
  totalRecords: number;
}
