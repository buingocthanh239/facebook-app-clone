import { MyFormData } from 'src/common/type/type';
import { IBodyResponse } from 'src/interfaces/common.interface';
import { postMethodApi, postMethodWithFormDataApi } from './api';
import { PostApi } from './clientConstant';

export interface IAddPostData {
  id: string;
  coins: string;
  code: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  coins: string;
  listing: any[];
}

export interface Category {
  id: string;
  has_name: string;
  name: string;
}

export interface IGetPostData {
  author: Author;
  banned: string;
  can_edit: string;
  can_mark: string;
  can_rate: string;
  category: Category;
  created: string;
  described: string;
  disappointed: string;
  fake: string;
  id: string;
  image: [{ id: string; url: string }];
  video: { url: string; thumb: string };
  is_blocked: string;
  is_felt: string;
  is_marked: string;
  kudos: string;
  messages: string;
  modified: string;
  name: string;
  state: string;
  trust: string;
  url: string;
}

export const addPost = async (data: MyFormData): Promise<IBodyResponse<IAddPostData>> => {
  return postMethodWithFormDataApi(PostApi.ADD_POST, data);
};

export const editPost = async (data: MyFormData): Promise<IBodyResponse<IAddPostData>> => {
  return postMethodWithFormDataApi(PostApi.EDIT_POST, data);
};

export const getPost = async (data: { id: string }): Promise<IBodyResponse<IGetPostData>> => {
  return postMethodApi(PostApi.GET_POST, data);
};
