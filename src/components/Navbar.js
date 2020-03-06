import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";

class Navbar extends Component {
  render() {
    const { logout, isLoggedIn } = this.props;

    return (
      <nav>
        <div>
          <Link to={"/"} id='home-btn'>
            <i className='fa fa-home'></i>
          </Link>
          {isLoggedIn ? (
            <i onClick={logout} className='fa fa-sign-out'></i>
          ) : (
            <>
              <div>
                <h3>HOUSE PARTY</h3>
              </div>
            </>
          )}
        </div>
      </nav>
    );
  }
}

export default withAuth(Navbar);
