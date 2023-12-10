import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import friendReducer from './friendSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  friend: friendReducer
});

export default rootReducer;
