import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ILoginData } from 'src/interfaces/auth.interface';
import { IBodyResponse, IErrorData, IUser } from 'src/interfaces/common.interface';
import { ILoginResponseData, loginApi } from 'src/services/auth.services';
import { RootState } from '..';
import { saveTokenIntoKeychain } from 'src/utils/kechain';

interface IAuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: IErrorData | IErrorData[] | string | null;
  user: IUser | null;
}

const initialState: IAuthState = {
  isLoading: false,
  isAuthenticated: false,
  error: null,
  user: null
};

export const login = createAsyncThunk(
  'auth/login',
  async (data: ILoginData, { rejectWithValue }) => {
    try {
      const res = await loginApi(data);
      if (!res.success) {
        return rejectWithValue(res);
      }
      const { token, ...remainData } = res.data;
      await saveTokenIntoKeychain(remainData.id, token);
      return remainData;
    } catch (err) {
      return rejectWithValue({ message: 'sever availability' });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: build => {
    build.addCase(login.rejected, (state, action) => {
      const payload = action.payload as IBodyResponse<ILoginResponseData>;
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = payload?.message;
    });

    build.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload as IUser;
    });

    build.addCase(login.pending, state => {
      state.isLoading = true;
    });
  },
  reducers: {
    deleteErrorMessage: state => ({ ...state, error: null })
  }
});
export const selectAuth = (state: RootState) => state.auth;
export const { deleteErrorMessage } = authSlice.actions;
export default authSlice.reducer;
