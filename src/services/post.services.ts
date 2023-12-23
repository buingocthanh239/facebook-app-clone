import { MyFormData } from 'src/common/type/type';
import { IBodyResponse } from 'src/interfaces/common.interface';
import { postMethodWithFormDataApi } from './api';
import { PostApi } from './clientConstant';

interface IAddPostData {
  id: string;
  coins: string;
}

export const addPost = async (data: MyFormData): Promise<IBodyResponse<IAddPostData>> => {
  return postMethodWithFormDataApi(PostApi.ADD_POST, data);
};
