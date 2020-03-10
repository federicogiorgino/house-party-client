import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withAuth } from "./../lib/Auth";

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;

    this.props.login(username, password);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className='mui-container p-40'>
        <div className='mui-panel '>
          <form onSubmit={this.handleFormSubmit}>
            <h1>Login</h1>
            <div className='mui-textfield'>
              <input
                type='text'
                name='username'
                placeholder='Username'
                value={username}
                onChange={this.handleChange}
              />
            </div>
            <div className='mui-textfield'>
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input
                className='mui-btn mui-btn--raised mui-btn--primary'
                type='submit'
                value='Login'
              />
            </div>
          </form>
          <br />
          <div>
            <p>
              Don't have an account? <Link to={"/signup"}> Signup</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
