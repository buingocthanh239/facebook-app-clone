import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import friendReducer from './friendSlice';
import appSlice from './appSlice';

const rootReducer = combineReducers({
  app: appSlice,
  auth: authReducer,
  profile: profileReducer,
  friend: friendReducer
});

export default rootReducer;
