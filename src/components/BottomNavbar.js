import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withAuth } from "../lib/Auth";

class BottomNav extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav className=''>
        <NavLink to='/parties'>
          <i className='fa fa-calendar'></i>
        </NavLink>
        <NavLink to='/create'>
          <i className='fa fa-plus-square'></i>
        </NavLink>
        <NavLink to={`/user/${user._id}`} exact>
          <i className='fa fa-user'></i>
        </NavLink>
      </nav>
    );
  }
}

export default withAuth(BottomNav);
