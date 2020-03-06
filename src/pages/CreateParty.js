import React, { Component } from "react";
import partyService from "../lib/parties-service";
import BottomNavbar from "../components/BottomNavbar";

class CreateParty extends Component {
  state = {
    title: "",
    description: "",
    guestLimit: "",
    city: "Rome",
    address: "",
    date: ""
  };

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = e => {
    e.preventDefault();

    const { title, description, guestLimit, city, address, date } = this.state;

    const newParty = { title, description, guestLimit, city, address, date };
    partyService
      .create(newParty)
      .then(party => {
        this.props.history.push(`/parties/${party._id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { title, description, guestLimit, city, address, date } = this.state;
    return (
      <div className='create-form-container'>
        <div className='create-form'>
          <form onSubmit={this.submitHandler}>
            
            {/* title field */}
            <div>
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

            <div>
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

            <div>
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

            <div>
              <label>City:</label>
              <div>
                <div>
                  <select name='city' value={city} onChange={this.handleChange}>
                    <option value='Rome'>Rome</option>
                    <option value='Barcelona'>Barcelona</option>
                    <option value='Zurich'>Zurich</option>
                    <option value='Amsterdam'>Amsterdam</option>
                    <option value='Paris'>Paris</option>
                    <option value='Berlin'>Berlin</option>
                    <option value='New York City'>New York City</option>
                    <option value='Moscow'>Moscow</option>
                    <option value='Miami'>Miami</option>
                  </select>
                </div>
              </div>

              {/* address field */}

              <div>
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

              <div>
                <label>Date:</label>
                <div>
                  <input
                    placeholder='When is the party??'
                    type='date'
                    name='date'
                    value={date}
                    onChange={this.changeHandler}
                  />
                </div>
              </div>

              <div className='button-container'>
                <button type='submit' className='btn btn-positive  '>
                  Create Party
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
