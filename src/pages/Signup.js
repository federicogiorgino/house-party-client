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
      <div className='mui-container p-15 oflow'>
        <div className='mui-panel '>
          <h1>Sign Up</h1>
          <form onSubmit={this.handleFormSubmit} className='mui-form'>
            <div className='mui-textfield'>
              <input
                type='text'
                name='firstName'
                placeholder='First Name'
                value={firstName}
                required
                onChange={this.handleChange}
              />
            </div>
            <div className='mui-textfield'>
              <input
                type='text'
                name='lastName'
                placeholder='Last Name'
                value={lastName}
                required
                onChange={this.handleChange}
              />
            </div>
            <div className='mui-textfield'>
              <input
                type='email'
                name='email'
                placeholder='E-Mail'
                value={email}
                required
                onChange={this.handleChange}
              />
            </div>
            <div className='mui-textfield'>
              <input
                type='text'
                name='username'
                placeholder='Username'
                value={username}
                required
                onChange={this.handleChange}
              />
            </div>
            <div className='mui-textfield'>
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={password}
                required
                onChange={this.handleChange}
              />
            </div>
            <div className='mui-textfield'>
              <input
                type='text'
                name='bio'
                placeholder='Tell us something about yourself'
                value={bio}
                required
                onChange={this.handleChange}
              />
            </div>
            <input
              className='mui-btn mui-btn--raised mui-btn--primary'
              type='submit'
              value='Signup'
            />
          </form>
          <br />
          <div>
            <p>
              Already have an account?
              <Link to={"/login"}> Login</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Signup);
