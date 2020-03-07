import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";

class Signup extends Component {
  state = { firstName: "", lastName: "", username: "", password: "", email: "", bio: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { firstName, lastName, username, password, email, bio } = this.state;

    this.props.signup(firstName, lastName, username, password, email, bio);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { firstName, lastName, username, password, email, bio } = this.state;
    return (
      <div className='bg'>
        <div className='auth-container'>
          <h1>Sign Up</h1>
          <div>
            <form onSubmit={this.handleFormSubmit}>
              <div>
                {/* <label>First Name:</label> */}
                <input
                  type='text'
                  name='firstName'
                  placeholder='First Name'
                  value={firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                {/* <label>Last Name:</label> */}
                <input
                  type='text'
                  name='lastName'
                  placeholder='Last Name'
                  value={lastName}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                {/* <label>E-Mail:</label> */}
                <input
                  type='email'
                  name='email'
                  placeholder='E-Mail'
                  value={email}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                {/* <label>Username:</label> */}
                <input
                  type='text'
                  name='username'
                  placeholder='Username'
                  value={username}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                {/* <label>Password:</label> */}
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={password}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                {/* <label>Bio:</label> */}
                <input
                  type='text'
                  name='bio'
                  placeholder='Tell us something about yourself'
                  value={bio}
                  onChange={this.handleChange}
                />
              </div>{" "}
              <input className='pure-material-button-contained' type='submit' value='Signup' />
            </form>
            <div>
              <p>
                Already have an account?
                <Link to={"/login"}> Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Signup);
