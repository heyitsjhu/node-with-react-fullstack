import { FETCH_USER } from '../actions/types';


// initial state is usually undefined
// in default scenarios, we probably don't want to return undefined.
// this is why we set an empty object as the default value
// Edit: or we can set it to null as a way of indicating that
// we are not sure if the user is logged in or not yet.
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      // when a user is not logged in, payload returns an empty string "", which is falsey
      // so to ensure we get something more concrete and consistent we pass in false as a secondary condition
      return action.payload || false;
    default:
      return state;
  }
}