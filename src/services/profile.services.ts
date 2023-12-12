import { ProfileApi } from './clientConstant';
import { IBodyResponse, IUser } from 'src/interfaces/common.interface';
import { postMethodApi } from './api';
import { IChangeInfoAfterSignup, ISetUserInfoData } from 'src/interfaces/profile.interface';

export interface ISetUserInfoResponseData {
  avatar: string;
  cover_image: string;
  link: string;
  city: string;
  country: string;
}

export const changeInfoAfterSignupApi = async (
  data: IChangeInfoAfterSignup
): Promise<IBodyResponse<any>> => {
  return postMethodApi(ProfileApi.CHANGE_PROFILE_AFTER_SIGNUP, data);
};

export const getUserInfoApi = async (data: { user_id: string }): Promise<IBodyResponse<IUser>> => {
  return postMethodApi(ProfileApi.GET_USER_INFO, data);
};

export const setUserInfoApi = async (
  data: ISetUserInfoData
): Promise<IBodyResponse<ISetUserInfoResponseData>> => {
  return postMethodApi(ProfileApi.SET_USER_INFO, data);
};
