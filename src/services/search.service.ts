import {
  IGetSavedSearch,
  IDeleteSavedSearch,
  ISearch,
  ISearchResult
} from 'src/components/interfaces/search.interface';
import { postMethodApi } from './api';
import { SearchApi } from './clientConstant';
import { IBodyResponse, IListBodyResponse } from 'src/components/interfaces/common.interface';
export const getSaveSearchApi = async (data: IGetSavedSearch): Promise<IBodyResponse<any>> => {
  return postMethodApi(SearchApi.GET_SAVE_SEARCH, data);
};

export const deleteSavedSearchApi = async (data: IDeleteSavedSearch): Promise<any> => {
  return postMethodApi(SearchApi.DEL_SAVE_SEARCH, data);
};

export const searchApi = async (data: ISearch): Promise<IListBodyResponse<ISearchResult>> => {
  return postMethodApi(SearchApi.SEARCH, data);
};
