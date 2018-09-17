// convention, when importing, compiler will look for index.js file
import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

// combines a collection of reducers into a single object.
export default combineReducers({
  // keys defined here are going to represent the keys
  // that exist in the application's state object
  // put some thought into these!
  auth: authReducer,
  form: reduxFormReducer,
  surveys: surveysReducer,
});
