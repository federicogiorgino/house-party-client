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

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = e => {
    e.preventDefault();

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
      <div className='form-container'>
        <div className='create-form'>
          <form onSubmit={this.submitHandler}>
            <h3>Create a new Party</h3>
            {/* title field */}
            <div className='input-form'>
              <label>Party Name:</label>
              <div>
                <input
                  placeholder="What's the party name?"
                  type='text'
                  name='title'
                  value={title}
                  onChange={this.changeHandler}
                />
              </div>
            </div>

            <div className='input-form'>
              <label>Description:</label>
              <div>
                <input
                  placeholder='Tell us more about the party'
                  type='text'
                  name='description'
                  value={description}
                  onChange={this.changeHandler}
                />
              </div>
            </div>

            <div className='input-form'>
              <label>Guest Limit</label>
              <div>
                <input
                  placeholder="What's the maximum guest amount?"
                  type='number'
                  name='guestLimit'
                  value={guestLimit}
                  onChange={this.changeHandler}
                />
              </div>
            </div>

            <div className='input-form'>
              <div className='city-picker'>
                <label>City: </label>
                <div>
                  <select name='city' value={city} onChange={this.handleChange}>
                    <option value='Rome'>Rome</option>
                    <option value='Barcelona'>Barcelona</option>
                    <option value='San Francisco'>San Francisco</option>
                    <option value='London'>London</option>
                    <option value='Paris'>Paris</option>
                    <option value='Berlin'>Berlin</option>
                    <option value='New York City'>New York City</option>
                    <option value='Moscow'>Moscow</option>
                    <option value='Sao Paulo'>Sao Paulo</option>
                  </select>
                </div>
              </div>

              {/* address field */}

              <div className='input-form'>
                <label>Adress:</label>
                <div>
                  <input
                    placeholder='Street, Number?'
                    type='text'
                    name='address'
                    value={address}
                    onChange={this.changeHandler}
                  />
                </div>
              </div>

              <div className='input-form'>
                <div className='img-picker'>
                  <label>Image:</label>
                  <input
                    placeholder='Upload an Image'
                    type='file'
                    name='image'
                    onChange={this.imageHandler}
                  />
                </div>
              </div>

              <div className='input-form'>
                <label>Date:</label>
                <div>
                  <input
                    className='date-picker'
                    placeholder='When is the party??'
                    type='date'
                    name='date'
                    value={date}
                    onChange={this.changeHandler}
                  />
                </div>
              </div>
              <br />

              <div className='btn-container'>
                <button className='btn-round' type='submit' disabled={!this.state.imageReady}>
                  <i className='material-icons'>add</i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <BottomNavbar />
      </div>
    );
  }
}
export default CreateParty;
