import { ICheckVerifyCodeBody, ILoginData } from 'src/interfaces/auth.interface';
import { postMethodApi } from './api';
import { AuthAPi } from './clientConstant';
import { IBodyResponse, IUser } from 'src/interfaces/common.interface';

export interface ILoginResponseData extends IUser {
  token: string;
}

export interface ISignUpResponseData {
  verify_code: string;
}

export const loginApi = async (data: ILoginData): Promise<IBodyResponse<ILoginResponseData>> => {
  return postMethodApi(AuthAPi.LOGIN, data);
};

export const signUpApi = async (data: ILoginData): Promise<IBodyResponse<ISignUpResponseData>> => {
  return postMethodApi(AuthAPi.SIGNUP, data);
};

export const logout = async (): Promise<IBodyResponse<any>> => {
  return postMethodApi(AuthAPi.LOGOUT);
};

export const getVerifyCodeApi = async (data: {
  email: string;
}): Promise<IBodyResponse<ISignUpResponseData>> => {
  return postMethodApi(AuthAPi.GETVERIFYTOKEN, data);
};

export const checkVerifyCodeApi = async (
  data: ICheckVerifyCodeBody
): Promise<IBodyResponse<any>> => {
  return postMethodApi(AuthAPi.CHECKVERIFYTOKEN, data);
};
