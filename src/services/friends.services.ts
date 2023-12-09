import { IBodyResponse } from 'src/interfaces/common.interface';
import { IGetRequestedFriends, ISetAcceptFriend } from 'src/interfaces/friends.interface';
import { postMethodApi } from './api';
import { FriendApi } from './clientConstant';

export const getRequestedFriendsApi = async (
  data: IGetRequestedFriends
): Promise<IBodyResponse<any>> => {
  return postMethodApi(FriendApi.GET_REQUESTED_FRIENDS, data);
};
export const setAcceptFriendApi = async (data: ISetAcceptFriend): Promise<IBodyResponse<any>> => {
  return postMethodApi(FriendApi.SET_ACCEPT_FRIEND, data);
};
