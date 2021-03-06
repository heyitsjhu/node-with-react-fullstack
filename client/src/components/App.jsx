import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// allows react components to access redux actions
import { connect } from 'react-redux';
// pull out all actions defined in actions.js and make available in an actions object
import * as actions from '../actions';

import Logger from 'js-logger';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './Surveys/New';

class App extends Component {
  // lifecycle method to fetch user
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    Logger.debug("I'm a debug message!");
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
              <Route exact path="/" component={Landing} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/surveys/new" component={SurveyNew} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// make App available for import
// connect react to with redux actions which can then be accessed via this.props
export default connect(
  null,
  actions
)(App);
