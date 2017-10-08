import React, { Component } from 'react';

class Header extends Component {
  render() {
    return(
      <header>
        <nav>
          <div className="nav-wrapper">
            <a href="#" class="left brand-logo">Welcome</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a href="/auth/google">Login with Google</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header;