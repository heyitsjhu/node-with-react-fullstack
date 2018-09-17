// action creator - initiate change
// used to modify state from redux store
// actions typically imported in App.js

// file separation is for organization purposes
import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// action that fetches a user
// arrow functions, if you only have one expression, you can remove the {} and return keyword.
// syntax / style via redux-thunk and async/await
export const fetchUser = () => async dispatch => {
  // axios will return a data object in the returned payload containing the actual response data.
  // So, usually you can just return res.data - just the response data you're concerned about.
  const res = await axios.get('/api/current_user');

  // this is redux-thunk? <-- no it's not :D
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

//TODO: talk about how dispatching causes the state to update, capturing new user credits
export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

//TODO: explain what history object is (react router)
export const submitSurvey = (values, history) => async dispatch => {
  //TODO: explain the response is what we determined in the routes file in express
  const res = await axios.post('/api/surveys', values);

  history.push('/dashboard');
  dispatch({ type: FETCH_USER, payload: res.data });
};
