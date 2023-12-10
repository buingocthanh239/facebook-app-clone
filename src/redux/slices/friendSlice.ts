import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { IErrorData } from 'src/interfaces/common.interface';
import { IDataFriends, IGetUserFriends, IUnfriend } from 'src/interfaces/friends.interface';
import { getUserFriendsApi, unfriendApi } from 'src/services/friends.services';

interface IFriendState {
  loading: boolean;
  error: IErrorData | IErrorData[] | string | null;
  friends: IDataFriends | null;
}

const initialState: IFriendState = {
  loading: false,
  error: null,
  friends: null
};

export const getUserFriends = createAsyncThunk(
  'friend/get_user_friends',
  async (data: IGetUserFriends, { rejectWithValue }) => {
    try {
      const result = await getUserFriendsApi(data);
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue({ message: 'sever availability' });
    }
  }
);

export const unfriend = createAsyncThunk(
  'friend/unfriend',
  async (data: IUnfriend, { rejectWithValue }) => {
    try {
      const result = await unfriendApi(data);
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue({ message: 'sever availability' });
    }
  }
);

const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state = { ...state, friends: action.payload };
    }
  },
  extraReducers: builder => {
    builder.addCase(getUserFriends.fulfilled, (state, action) => {
      const updatedInfo = action.payload.data;
      state.friends = {
        ...state.friends,
        friends: updatedInfo.friends,
        total: updatedInfo.total
      } as IDataFriends;
      console.log('state');
      console.log(state.friends);
    });
    builder.addCase(unfriend.fulfilled, (state, action) => {
      const updatedInfo = action.payload.data;
      console.log('updatedInfo');
      console.log(updatedInfo);
      console.log('action.payload');
      console.log(action.payload);
      state.friends = {
        ...state.friends,
        friends: updatedInfo.friends,
        total: updatedInfo.total
      } as IDataFriends;
      console.log('state');
      console.log(state.friends);
    });
  }
});

export const { setUserName } = friendSlice.actions;

export default friendSlice.reducer;

export const selectFriend = (state: RootState) => state.friend;
