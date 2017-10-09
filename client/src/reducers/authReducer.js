
// initial state is usually undefined
// in default scenarios, we probably don't
// want to return undefined.
// this is why we set an empty object as the default value
export default function(state = {}, action) {
	console.log(action);
  switch (action.type) {
    default: 
      return state;
  }
}