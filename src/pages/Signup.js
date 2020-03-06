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
      <div className='signup-container'>
        <h1>Sign Up</h1>
        <div className='signup-form'>
          <form onSubmit={this.handleFormSubmit}>
            <div>
              <label>First Name:</label>
              <br />
              <input type='text' name='firstName' value={firstName} onChange={this.handleChange} />
            </div>
            <div>
              <label>Last Name:</label>
              <br />
              <input type='text' name='lastName' value={lastName} onChange={this.handleChange} />
            </div>
            <div>
              <label>E-Mail:</label>
              <br />
              <input type='email' name='email' value={email} onChange={this.handleChange} />
            </div>
            <div>
              <label>Username:</label>
              <br />
              <input type='text' name='username' value={username} onChange={this.handleChange} />
            </div>
            <div>
              <label>Password:</label>
              <br />
              <input
                type='password'
                name='password'
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Bio:</label>
              <br />
              <input type='text' name='bio' value={bio} onChange={this.handleChange} />
            </div>{" "}
            <button className='signup-btn btn btn-positive'>
              <input className='login-btn' type='submit' value='Signup' />
            </button>
          </form>
          <div className='already-section'>
            <p className='already'>Already have account?</p>
            <p>
              <Link to={"/login"}> Login</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Signup);
