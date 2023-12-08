import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { changeInfoAfterSignupApi } from 'src/services/profile.services';
import { IChangeInfoAfterSignup } from 'src/interfaces/profile.interface';

interface IProfileState {
  username: string;
  description: string;
  avatar: File | null;
  address: string;
  city: string;
  country: string;
  cover_image: File | null;
  link: string;
}

const initialState: IProfileState = {
  username: '',
  description: '',
  avatar: null,
  address: '',
  city: '',
  country: '',
  cover_image: null,
  link: ''
};

export const changeInfoAfterSignup = createAsyncThunk(
  'profile/change_info_after_signup',
  async (data: IChangeInfoAfterSignup, { rejectWithValue }) => {
    try {
      const result = await changeInfoAfterSignupApi(data);
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue({ message: 'sever availability' });
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLink: (state, action) => {
      state = { ...state, link: action.payload };
    }
  },
  extraReducers: builder => {
    builder.addCase(changeInfoAfterSignup.fulfilled, (state, action) => {
      const updatedInfo = action.payload;
      state = { ...state, ...updatedInfo };
    });
  }
});

export const { setLink } = profileSlice.actions;

export default profileSlice.reducer;

export const selectProfile = (state: RootState) => state.profile;
