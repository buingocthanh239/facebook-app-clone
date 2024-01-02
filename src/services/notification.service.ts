import {
  CategoryType,
  FeelType,
  GroupType,
  MarkType,
  NotificationType,
  ReadNotification
} from 'src/common/enum/commom';
import { IBodyResponse, IListBodyResponse } from 'src/interfaces/common.interface';
import { NotificationApi } from './clientConstant';
import axiosInstance from './axiosInstance';
import { postMethodApi } from './api';

export interface IGetNotification {
  index: number;
  count: number;
}

export interface IGetCheckNewItem {
  last_id: number;
  category_id: CategoryType;
}

export interface INotificationItem {
  type: NotificationType;
  object_id: string;
  title: string;
  notification_id: string;
  created: string;
  avatar: string;
  group: GroupType;
  read: ReadNotification;
  user: {
    id: string;
    avatar: string;
    username: string;
  };
  post: {
    id: string;
    described: string;
    status: string;
  };
  mark: {
    mark_id: string;
    type_of_mark: MarkType;
    mark_content: string;
  };
  feel: {
    feel_id: string;
    type: FeelType;
  };
}

export interface IGetNotificationResponse extends IListBodyResponse<INotificationItem> {
  last_update: string;
  badge: string;
}
export interface ICheckNewItemResponseData {
  new_item: string;
}
export const getNotificationApi = (data: IGetNotification): Promise<IGetNotificationResponse> => {
  return axiosInstance.post(NotificationApi.GET_NOTIFICATION, data);
};

export const checkNewItemAPi = (
  data: IGetCheckNewItem
): Promise<IBodyResponse<ICheckNewItemResponseData>> => {
  return postMethodApi(NotificationApi.CHECK_NEW_iTEMS, data);
};
