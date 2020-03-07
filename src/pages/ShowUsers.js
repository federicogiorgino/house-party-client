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
    const { firstName, lastName, username, email, bio, image, phone, _id } = this.state.user;

    return (
      <div className='profile-page'>
        <div className='img-container'>
          <img src={image} alt='Placeholder' />
        </div>
        <div className='profile-details'>
          <div>
            <h2>
              {firstName} {lastName}
            </h2>
          </div>
          <div>
            <p>
              <span className='info-label'>Username: </span>
              {username}
            </p>
            <p>
              <span className='info-label'>Phone Number: </span>
              {phone}
            </p>
            <p>
              <span className='info-label'>E-Mail: </span>
              {email}
            </p>
            <span className='info-label'>Bio</span>
            <p>{bio}</p>

            {// if user is on his profile, display 'Edit' button
            this.state.currentUser ? (
              <div>
                <Link to={`/user/edit/${_id}`}>
                  <button className='btn-round'>
                    <i className='material-icons'>edit</i>
                  </button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }
}

export default withAuth(ShowUsers);
