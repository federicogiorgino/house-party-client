import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withAuth } from "../lib/Auth";

class BottomNav extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav className='bottom-navbar'>
        <NavLink to='/parties'>
          <i className='material-icons'>view_headline</i>
        </NavLink>

        <NavLink to='/parties/create'>
          <i className='material-icons'>add</i>
        </NavLink>
        <NavLink to={`/user/${user._id}`} exact>
          <i className='material-icons'>account_box</i>
        </NavLink>
      </nav>
    );
  }
}

export default withAuth(BottomNav);
