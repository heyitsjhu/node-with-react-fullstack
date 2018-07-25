import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

// webpack will automatically assume you are attempting to import
// from an npm module if you do not provide a relative path
import 'materialize-css/dist/css/materialize.min.css';

import App from './components/App';
import reducers from './reducers';

// create a store
// first arg, collection of stores (reducers)
// second arg, initial state
// third arg, apply middleware
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// first arg: component
// seconrd arg: destination in public/index.html where component will be rendered
ReactDOM.render(
  // <Provider /> the glue that bonds react and redux together,
  // making the redux stores accessible to every component in the app
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
