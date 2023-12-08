import { ProfileApi } from './clientConstant';
import { IBodyResponse } from 'src/interfaces/common.interface';
import { postMethodApi } from './api';
import { IChangeInfoAfterSignup } from 'src/interfaces/profile.interface';

export const changeInfoAfterSignupApi = async (
  data: IChangeInfoAfterSignup
): Promise<IBodyResponse<any>> => {
  return postMethodApi(ProfileApi.CHANGE_PROFILE_AFTER_SIGNUP, data);
};
