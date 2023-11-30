import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './couterReducer';

const rootReducer = combineReducers({
  counter: counterReducer
});

export default rootReducer;
