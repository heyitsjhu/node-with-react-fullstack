import { FETCH_SURVEYS } from '../actions/types';

/**
 * Because we're always expecting an array of surveys, we use an empty array as the default value
 * @param {*} state
 * @param {*} action
 */
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
