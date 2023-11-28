import { type AxiosResponse } from 'axios';
import { HttpStatus, OrderDirection } from 'src/common/constants';

export interface IBodyResponse<T> extends AxiosResponse {
  success: boolean;
  isRequestError?: boolean;
  code: HttpStatus;
  message: string;
  data: T;
  errors?: { key: string; message: string; errorCode: HttpStatus }[];
  statusCode: HttpStatus;
}

export interface ICommonListQuery {
  page?: number;
  limit?: number;
  orderBy?: string;
  orderDirection?: OrderDirection;
  keyword?: string;
}

export interface IUser {
  email: string;
}

export interface ILoginResponse {
  accessToken: {
    token: string;
    expiresIn: number;
  };
  refreshToken: {
    token: string;
    expiresIn: number;
  };
  profile: IUser;
}

export interface ICommonGetListQuery {
  page?: number;
  limit?: number;
  keyword?: string;
  orderDirection?: OrderDirection;
  order?: OrderDirection;
  perPage?: number;
}

export interface IGetListResponse<T> {
  items: T[];
  totalItems: number;
}

export interface IVideo {
  videoUri: string;
  thumnail: string;
}

export interface IListItem {
  title: string;
  subtitle?: string;
  iconName?: string;
  onPress?: () => any;
}
