import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import friendReducer from './friendSlice';
import postReducer from './postSlice';
import videoReducer from './videoSlice';
import appSlice from './appSlice';
import notificationReducer from './notificationSlice';
import settingReducer from './settingSlice';

const rootReducer = combineReducers({
  app: appSlice,
  auth: authReducer,
  profile: profileReducer,
  friend: friendReducer,
  post: postReducer,
  video: videoReducer,
  notification: notificationReducer,
  setting: settingReducer
});

export default rootReducer;
