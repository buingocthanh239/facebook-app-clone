import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoginData } from 'src/interfaces/auth.interface';
import { IBodyResponse, IErrorData, IUser } from 'src/interfaces/common.interface';
import { ILoginResponseData, loginApi, logoutApi } from 'src/services/auth.services';
import { RootState } from '..';
import { saveTokenIntoKeychain } from 'src/utils/kechain';
import { resetGenericPassword } from 'react-native-keychain';
import { AccountStatus } from 'src/common/enum/commom';
import { getUserInfoApi } from 'src/services/profile.services';

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
      return { ...remainData, email: data.email };
    } catch (err) {
      return rejectWithValue({ message: 'sever availability' });
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await logoutApi();
    await resetGenericPassword();
  } catch (err) {
    return;
  }
});

export const getProfile = createAsyncThunk('auth/getProfile', async (data: { user_id: string }) => {
  try {
    const res = await getUserInfoApi(data);
    if (res.success) {
      return res.data;
    } else {
      return;
    }
  } catch (err) {
    return;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: build => {
    build.addCase(login.rejected, (state, action) => {
      const payload = action.payload as IBodyResponse<ILoginResponseData>;
      state.isAuthenticated = false;
      state.error = payload?.message;
      state.isLoading = false;
    });

    build.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload as IUser;
      state.isLoading = false;
    });

    build.addCase(login.pending, state => {
      state.isLoading = true;
    });

    //logout
    build.addCase(logout.fulfilled, state => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });

    build.addCase(logout.rejected, state => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });

    build.addCase(logout.pending, state => {
      state.isLoading = true;
    });

    //get profile
    build.addCase(getProfile.fulfilled, (state, action) => {
      state.user = { ...state.user, ...action.payload } as IUser;
    });
  },
  reducers: {
    deleteErrorMessage: state => ({ ...state, error: null }),
    reset: state => ({
      ...state,
      isAuthenticated: false,
      user: null,
      error: null,
      isLoading: false
    }),
    modifyAccountAtivity: (state, action: PayloadAction<AccountStatus>) => ({
      ...state,
      user: { ...state.user, active: action.payload } as IUser
    })
  }
});
export const selectAuth = (state: RootState) => state.auth;
export const { deleteErrorMessage, reset, modifyAccountAtivity } = authSlice.actions;
export default authSlice.reducer;
