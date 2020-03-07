import React, { Component } from "react";
import authService from "../lib/auth-service";
import userService from "../lib/user-service";
import { Link } from "react-router-dom";

import { withAuth } from "../lib/Auth";
import BottomNavbar from "../components/BottomNavbar";

class ShowUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      currentUser: false
    };
  }

  findUser = () => {
    //pulls the id from the params.id
    const id = this.props.match.params.id;
    //gets the user with the specified id and refreshes the state with user data
    userService
      .getOne(id)
      .then(user => {
        this.setState({ user });
      })
      .catch(error => {
        console.log(error);
      });

    authService
      .me()
      .then(currentUser => {
        //checks if user is the currentuser
        if (id === currentUser._id) {
          //sets the currentUser state to true
          this.setState({ currentUser: true });
        }
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.findUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.findUser();
    }
  }

  render() {
    const { firstName, lastName, username, email, bio, _id } = this.state.user;

    return (
      <div className='user-profile'>
        <div>
          <img
            src='https://medgoldresources.com/wp-content/uploads/2018/02/avatar-placeholder.gif'
            alt='Placeholder'
          />
        </div>
        <div>
          <h2 className='h2-bold'>
            {firstName} {lastName}
          </h2>
        </div>
        <div>
          <p>
            <span>Username:</span>
            {username}
          </p>
          <p>
            <span>E-Mail:</span>
            {email}
          </p>
          <p>
            <span>Info:</span>
            {bio}
          </p>
        </div>
        <BottomNavbar />
      </div>
    );
  }
}

export default withAuth(ShowUsers);
