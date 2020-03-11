import React, { Component } from "react";
import authService from "../lib/auth-service";
import userService from "../lib/user-service";
import { Link } from "react-router-dom";

import { withAuth } from "../lib/Auth";
import BottomNavbar from "../components/BottomNavbar";
import SimplifiedPartyCard from "../components/SimplifiedPartyCard";

class ShowUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      currentUser: false,
      organizing: [],
      attending: []
    };
  }

  findUser = () => {
    //pulls the id from the params.id
    const id = this.props.match.params.id;
    //gets the user with the specified id and refreshes the state with user data
    userService
      .getOne(id)
      .then(user => {
        const organizing = user.organizing;
        const attending = user.attending;

        this.setState({ user, organizing, attending });
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

  deleteUser = () => {
    const id = this.props.user._id;
    this.props.logout();
    userService.deleteOne(id);
  };

  render() {
    const { firstName, lastName, username, email, bio, image, phone, _id } = this.state.user;

    return (
      <div className='m-bot-20'>
        <div className='mui-container p-10'>
          <div className='mui-panel text-center'>
            <div className='img-container'>
              {image ? (
                <img src={image} alt='Placeholder' />
              ) : (
                <img
                  src='https://www.manufacturingusa.com/sites/manufacturingusa.com/files/default.png'
                  alt='Placeholder'
                />
              )}
            </div>
            <div className='profile-details' style={{ textAlign: "left" }}>
              <div>
                <h2>
                  {firstName} {lastName}
                </h2>
              </div>
              <div>
                <span className='info-label'>Username: </span>
                <p>{username}</p>
                <span className='info-label'>Phone Number: </span>
                <p>{phone}</p>
                <span className='info-label'>E-Mail: </span>
                <p>{email}</p>
                <span className='info-label'>Bio</span>
                <p>{bio}</p>

                {// if user is on his profile, display 'Edit' and Delete button
                this.state.currentUser ? (
                  <div>
                    <Link to={`/user/edit/${_id}`}>
                      <button className='mg-5 mui-btn mui-btn--raised mui-btn--primary'>
                        Edit{" "}
                      </button>
                    </Link>
                    <Link to={`/signup`}>
                      <button
                        className='mg-5 mui-btn mui-btn--raised mui-btn--danger'
                        onClick={() => {
                          this.deleteUser();
                        }}
                      >
                        Delete
                      </button>
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          <ul>
            <h3 style={{ color: "white", margin: "20px 0", fontWeight: "700", marginLeft: "20px" }}>
              Organizing Parties
            </h3>
            {this.state.organizing.map((party, index) => {
              return (
                <Link key={index} to={`/parties/${party._id}`}>
                  <SimplifiedPartyCard key={index} {...party} />
                </Link>
              );
            })}
          </ul>
        </div>

        <div className='container'>
          <ul>
            <h3 style={{ color: "white", margin: "20px 0", fontWeight: "700", marginLeft: "20px" }}>
              Attending Parties
            </h3>
            {this.state.attending.map((party, index) => {
              return (
                <Link key={index} to={`/parties/${party._id}`}>
                  <SimplifiedPartyCard key={index} {...party} />
                </Link>
              );
            })}
          </ul>
        </div>
        <BottomNavbar />
      </div>
    );
  }
}

export default withAuth(ShowUsers);
