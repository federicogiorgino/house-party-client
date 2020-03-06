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
      <div className='login-container'>
        <h1>Login</h1>
        <div className='login-form'>
          <form onSubmit={this.handleFormSubmit}>
            <div>
              <label>Username </label>
              <br />
              <input type='text' name='username' value={username} onChange={this.handleChange} />
            </div>
            <div>
              <label>Password</label>
              <br />
              <input
                type='password'
                name='password'
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <div>
              <button className='btn btn-positive'>
                <input className='login-btn' type='submit' value='Login' />
              </button>
            </div>
          </form>
          <div className='already-section'>
            <p className='already'>Don't have an account?</p>
            <p>
              <Link to={"/signup"}> Signup</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
