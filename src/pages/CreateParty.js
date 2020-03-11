import React, { Component } from "react";
import partyService from "../lib/parties-service";
import cloudinaryService from "../lib/cloudinary-service";

import BottomNavbar from "../components/BottomNavbar";

class CreateParty extends Component {
  state = {
    title: "",
    description: "",
    guestLimit: "",
    city: "Rome",
    image: "",
    address: "",
    date: "",
    imageReady: true
  };

  changeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitHandler = event => {
    event.preventDefault();

    const { title, description, guestLimit, city, address, date, image } = this.state;

    const newParty = { title, description, guestLimit, city, address, date, image };
    partyService
      .create(newParty)
      .then(party => {
        this.props.history.push(`/parties/${party._id}`);
      })
      .catch(err => {
        console.log(err);
      });
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

  render() {
    const { title, description, guestLimit, city, address, date } = this.state;
    return (
      <div className='mui-container p-15'>
        <div className='mui-panel'>
          <form onSubmit={this.submitHandler} className='mui-form'>
            <legend>Create a new Party</legend>
            <br />
            <div className='mui-textfield'>
              <input
                placeholder="What's the party name?"
                type='text'
                name='title'
                value={title}
                required
                onChange={this.changeHandler}
              />
            </div>

            <div className='mui-textfield'>
              <input
                placeholder='Tell us more about the party'
                type='text'
                name='description'
                value={description}
                required
                onChange={this.changeHandler}
              />
            </div>

            <div className='mui-textfield'>
              <input
                placeholder="What's the maximum guest amount?"
                type='number'
                name='guestLimit'
                value={guestLimit}
                required
                onChange={this.changeHandler}
              />
            </div>

            <div className='input-form'>
              <div className='mui-select'>
                <select name='city' value={city} onChange={this.changeHandler}>
                  <option value='Rome'>Rome</option>
                  <option value='Barcelona'>Barcelona</option>
                  <option value='San Francisco'>San Francisco</option>
                  <option value='London'>London</option>
                  <option value='Paris'>Paris</option>
                  <option value='Berlin'>Berlin</option>
                  <option value='New York City'>New York City</option>
                  <option value='Moscow'>Moscow</option>
                  <option value='Rio De Janeiro'>Rio De Janeiro</option>
                </select>
                <label>City </label>
              </div>
              <div className='mui-textfield'>
                <input
                  placeholder='Street, Number?'
                  type='text'
                  name='address'
                  value={address}
                  required
                  onChange={this.changeHandler}
                />
              </div>
              <div className='mui-form--inline'>
                <input
                  className='upload'
                  placeholder='Upload an Image'
                  type='file'
                  name='image'
                  onChange={this.imageHandler}
                />
              </div>

              <div className='mui-textfield'>
                <label>Date:</label>
                <input
                  className='date-picker'
                  placeholder='When is the party??'
                  type='date'
                  name='date'
                  value={date}
                  required
                  onChange={this.changeHandler}
                />
              </div>

              <button
                className='mui-btn mui-btn--raised mui-btn--primary'
                type='submit'
                disabled={!this.state.imageReady}
              >
                Create
              </button>
            </div>
          </form>
        </div>
        <BottomNavbar />
      </div>
    );
  }
}
export default CreateParty;
