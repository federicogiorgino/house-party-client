import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withAuth } from "./../lib/Auth";

class Navbar extends Component {
  render() {
    const { logout, isLoggedIn } = this.props;

    return (
      <nav>
        <NavLink to={"/"}>
          <i className='fa fa-home'></i>
        </NavLink>
        {isLoggedIn ? <i onClick={logout} className='fa fa-sign-out'></i> : null}
      </nav>
    );
  }
}

export default withAuth(Navbar);
