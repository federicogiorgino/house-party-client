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
    const { firstName, lastName, username, email, bio, attending, _id } = this.state.user;

    return (
      <div>
        <div className='container'>
          <div>
            <h3>Welcome {username}</h3>
            <h3>Name: {firstName}</h3>
            <h3>Last Name:{lastName}</h3>
            <h3>E-Mail: {email}</h3>
            <h3>Bio: {bio}</h3>

            <ul>
              {this.props.user.organizing.map((el, index) => (
                <li key={index}>
                  {index}
                  {el}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Link to={`/user/edit/${_id}`}>
              <button className='button is-info'>Edit profile</button>
            </Link>
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }
}

export default withAuth(ShowUsers);
