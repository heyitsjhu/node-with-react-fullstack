// action creator - initiate change
// used to modify state from redux store
// actions typically imported in App.js

// file separation is for organization purposes
import axios from "axios";
import { FETCH_USER } from "./types";

// action that fetches a user
// arrow functions, if you only have one expression, you can remove the {} and return keyword.
// syntax / style via redux-thunk and async/await
export const fetchUser = () => async dispatch => {
  // axios will return a data object in the returned payload containing the actual response data.
  const res = await axios.get("/api/current_user");

  // this is redux-thunk?
  dispatch({ type: FETCH_USER, payload: res });
};
