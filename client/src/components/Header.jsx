import React, { Component } from 'react';

// hook up component to the redux store
import { connect } from 'react-redux';

class Header extends Component {

  // methods defined inside this component,
  // but outside of built-in react functions,
  // are classified as helper methods

  renderContent() {
    switch (this.props.auth) {
      // unsure if user is logged in (still pending)
      case null:
        return;
      // certain user is logged out
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      // user is logged in
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }


  render() {
    console.log(this.props);
    return(
      <header>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="left brand-logo">Welcome</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">

              {this.renderContent()}

            </ul>
          </div>
        </nav>
      </header>
    )
  }
}

// retrieves the entire redux store, allowing us
// to return just the state we're concerned about
// for this component
// check the reducers index.js page to see which properties (states)
// are available
// the property (state) is then accessible through this.props
function mapStateToProps({ auth }) {
  return { auth };
}

// connect this component to redux store
export default connect(mapStateToProps)(Header);