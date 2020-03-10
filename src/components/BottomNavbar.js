import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withAuth } from "../lib/Auth";

class BottomNav extends Component {
  render() {
    const { logout, user } = this.props;
    return (
      // <nav className='mui-appbar'>
      //   <NavLink to={"/"}>
      //     <i className='material-icons'>home</i>
      //   </NavLink>
      //   <NavLink to='/parties' exact>
      //     <i className='material-icons'>view_headline</i>
      //   </NavLink>

      //   <NavLink to='/parties/create' exact>
      //     <i className='material-icons'>add</i>
      //   </NavLink>

      //   <NavLink to={`/user/${user._id}`} exact>
      //     <i className='material-icons'>account_box</i>
      //   </NavLink>

      //   <i onClick={logout} className='material-icons'>
      //     exit_to_app
      //   </i>
      // </nav>

      <nav class='mobile-bottom-nav'>
        <div class='mobile-bottom-nav__item mobile-bottom-nav__item--active'>
          <div class='mobile-bottom-nav__item-content'>
            <NavLink to={"/"}>
              <i className='material-icons'>home</i>
            </NavLink>
            Home
          </div>
        </div>
        <div class='mobile-bottom-nav__item'>
          <div class='mobile-bottom-nav__item-content'>
            <NavLink to='/parties' exact>
              <i className='material-icons'>view_headline</i>
            </NavLink>
            All Events
          </div>
        </div>
        <div class='mobile-bottom-nav__item'>
          <div class='mobile-bottom-nav__item-content'>
            <NavLink to='/parties/create' exact>
              <i className='material-icons'>add</i>
            </NavLink>
            Add
          </div>
        </div>

        <div class='mobile-bottom-nav__item'>
          <div class='mobile-bottom-nav__item-content'>
            <NavLink to={`/user/${user._id}`} exact>
              <i className='material-icons'>account_box</i>
            </NavLink>
            Profile
          </div>
        </div>
        <div class='mobile-bottom-nav__item'>
          <div class='mobile-bottom-nav__item-content'>
            <i onClick={logout} className='material-icons'>
              exit_to_app
            </i>
            Logout
          </div>
        </div>
      </nav>
    );
  }
}

export default withAuth(BottomNav);
