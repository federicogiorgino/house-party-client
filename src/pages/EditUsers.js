import React, { Component } from "react";
import userService from "../lib/user-service";

import BottomNavbar from "../components/BottomNavbar";

class EditUsers extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    bio: ""
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    userService
      .getOne(id)
      .then(user => {
        const { firstName, lastName, username, bio } = user;
        this.setState({ firstName, lastName, username, bio });
      })
      .catch(error => console.log(error));
  }

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { firstName, lastName, username, bio } = this.state;
    const { id } = this.props.match.params;
    const updatedUser = { firstName, lastName, username, bio };
    userService
      .updateOne(id, updatedUser)
      .then(() => {
        this.props.history.push(`/user/${id}`);
      })
      .catch(error => console.log(error));
  };

  render() {
    const { firstName, lastName, username, bio } = this.state;

    return (
      <div className='signup-container'>
        <h1>Edit Profile</h1>
        <div className='signup-form'>
          <form onSubmit={this.handleFormSubmit}>
            <div>
              <label>First Name:</label>
              <input type='text' name='firstName' value={firstName} onChange={this.changeHandler} />
            </div>
            <div>
              <label>Last Name:</label>
              <input type='text' name='lastName' value={lastName} onChange={this.changeHandler} />
            </div>
            <div>
              <label>Username:</label>
              <input type='text' name='username' value={username} onChange={this.changeHandler} />
            </div>
            <div>
              <label>Bio:</label>
              <br />
              <input type='text' name='bio' value={bio} onChange={this.changeHandler} />
            </div>
            <button type='submit' className='signup-btn btn btn-positive'></button>
          </form>
        </div>
        <BottomNavbar />
      </div>
    );
  }
}
export default EditUsers;
