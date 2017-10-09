// action creator - initiate change
// used to modify state from redux store
// actions typically imported in App.js

// file separation is for organization purposes
import axios from 'axios';
import { FETCH_USER } from './types';

// action that fetches a user
export const fetchUser = () => {
	// syntax / style via redux-thunk and async/await
	return function(dispatch) {
		// axios will return a data object in the returned payload containing the actual response data.
		axios.get('/api/current_user')
			.then(res => dispatch({ type: FETCH_USER, payload: res }));
	};
};