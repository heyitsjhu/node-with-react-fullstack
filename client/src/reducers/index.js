// convention, when importing, compiler will look for index.js file

import { combineReducers } from 'redux';
import authReducer from './authReducer';

// combines a collection of reducers into a single object.
export default combineReducers({
  // keys defined here are going to represent the keys
  // that exist in the application's state object
  // put some thought into these!
  auth: authReducer

});