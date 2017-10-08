import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';

// create a store 
// first arg, collection of stores
// second arg, initial state
// third arg, apply middleware
const store = createStore(() => [], {}, applyMiddleware());

// first arg: component
// seconrd arg: destination in public/index.html where component will be rendered
ReactDOM.render(
  // <Provider /> the glue that bonds react and redux together, 
  // making the redux stores accessible to every component in the app
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('#root')
);