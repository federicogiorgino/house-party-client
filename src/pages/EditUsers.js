import React, { Component } from "react";
import userService from "../lib/user-service";
import cloudinaryService from "../lib/cloudinary-service";

import BottomNavbar from "../components/BottomNavbar";

class EditUsers extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    image: "",
    phone: "",
    imageReady: true
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    userService
      .getOne(id)
      .then(user => {
        const { firstName, lastName, username, email, password, bio, image, phone } = user;
        this.setState({ firstName, lastName, username, email, password, bio, image, phone });
      })
      .catch(error => console.log(error));
  }

  changeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  imageHandler = event => {
    this.setState({ imageReady: false });

    const file = event.target.files[0];
    const imageFile = new FormData();

    imageFile.append("image", file);

    cloudinaryService.imageUpload(imageFile).then(imageUrl => {
      this.setState({ image: imageUrl, imageReady: true });
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { firstName, lastName, username, email, password, bio, image, phone } = this.state;
    const { id } = this.props.match.params;
    const updatedUser = { firstName, lastName, username, email, password, bio, image, phone };
    userService
      .updateOne(id, updatedUser)
      .then(() => {
        this.props.history.push(`/user/${id}`);
      })
      .catch(error => console.log(error));
  };

  render() {
    const { firstName, lastName, username, email, password, bio, phone } = this.state;

    return (
      <div className='mui-container'>
        <div className='mui-panel'>
          <form onSubmit={this.handleFormSubmit}>
            <legend>Edit Profile</legend>
            <br />
            <div className='mui-textfield'>
              <label>First Name</label>
              <input type='text' name='firstName' value={firstName} onChange={this.changeHandler} />
            </div>
            <div className='mui-textfield'>
              <label>Last Name</label>
              <input type='text' name='lastName' value={lastName} onChange={this.changeHandler} />
            </div>
            <div className='mui-textfield'>
              <label>Username</label>
              <input type='text' name='username' value={username} onChange={this.changeHandler} />
            </div>
            <div className='mui-textfield'>
              <label>Email</label>
              <input type='email' name='email' value={email} onChange={this.changeHandler} />
            </div>
            <div className='mui-textfield'>
              <label>Password:</label>
              <input
                type='password'
                name='password'
                value={password}
                onChange={this.changeHandler}
              />
            </div>
            <div className='mui-textfield'>
              <label>Phone Number:</label>
              <input type='number' name='phone' value={phone} onChange={this.changeHandler} />
            </div>
            <div className='mui-textfield'>
              <label>Bio:</label>
              <input type='text' name='bio' value={bio} onChange={this.changeHandler} />
            </div>
            <div>
              <label>Profile Picture</label>
              <input type='file' name='image' onChange={this.imageHandler} />
            </div>
            <button className='mui-btn mui-btn--raised mui-btn--primary' type='submit'>
              Save Changes
            </button>
          </form>
        </div>
        <BottomNavbar />
      </div>
    );
  }
}
export default EditUsers;
