import React, { Component } from "react";
import { withAuth } from "../lib/Auth";

import userService from "../lib/user-service";
import partiesService from "../lib/parties-service";
import { Link } from "react-router-dom";

import BottomNavbar from "../components/BottomNavbar";

class ShowParties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      party: {},
      //will set the switch between Join and leave party
      partyJoined: false,
      guests: []
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    const { user } = this.props;

    userService
      .getOne(user._id)
      .then(currentUser => {
        currentUser.attending.forEach(attendingParty => {
          //checks if the attending party id is equal to the id coming from this.props.match.params.id;
          if (attendingParty._id === id) {
            // if it is sets the partyJoined state to true
            this.setState({ partyJoined: true });
          }
        });
      })
      .catch(err => {
        console.log(err);
      });

    partiesService
      .getOne(id)
      .then(party => {
        this.setState({ party });
      })
      .catch(error => console.log(error));
  }

  join = () => {
    //userId from the props
    const id = this.props.user._id;
    const partyId = this.props.match.params.id;

    userService
      .attendParty(id, partyId)
      .then(() => {
        // sets the state of partyJoined to true
        this.setState({ partyJoined: true });
      })
      .catch(err => console.log(err));
  };

  leave = () => {
    const id = this.props.user._id;
    const partyId = this.props.match.params.id;

    userService
      .abandonParty(id, partyId)
      .then(() => {
        // sets the state of partyJoined to false
        this.setState({ partyJoined: false });
      })
      .catch(err => console.log(err));
  };

  render() {
    const formatDate = d => {
      let date = new Date(d);
      let dd = date.getDate();
      let mm = date.getMonth() + 1;
      let yyyy = date.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      d = dd + "/" + mm + "/" + yyyy;
      return d;
    };

    const {
      host,
      title,
      description,
      guestLimit,
      city,
      address,
      date,
      image,
      guests
    } = this.state.party;

    const MY_API = "AIzaSyBqaknflCPQt5yCLxe4U8SbQmR_y36kb1g";
    let url = `https://www.google.com/maps/embed/v1/search?q=${address},+${city}&key=${MY_API}`;

    return (
      <div className='mui-container'>
        <div className='mui-panel'>
          <div className='event-info'>
            <h1 style={{ fontWeight: "700" }}>{title}</h1>
            <div className='img-box'>
              {image ? (
                <img src={image} alt='' height='40%' />
              ) : (
                <img
                  src='https://www.americanexpress.lk/images/placeholder-600x600.jpg'
                  alt=''
                  height='40%'
                />
              )}
            </div>

            <div className='event-info-specific'>
              <p>
                <span>Description: </span>
                {description}
              </p>
            </div>

            <div className='event-info-specific'>
              <p>
                <span>Guests: </span>
                {this.state.guests.length}/{guestLimit}
              </p>
            </div>

            <div className='event-info-specific'>
              <p>
                <span>Where: </span>
                {city}, {address}
              </p>
            </div>

            <div className='event-info-specific'>
              <p>
                <span>When: </span>
                When: {formatDate(date)}
              </p>
            </div>

            {host ? (
              <div
                className='chip-container'
                style={{ display: "flex", flexWrap: "nowrap", width: "100%" }}
              >
                <span className='mdl-chip mdl-chip--contact'>
                  <span className='mdl-chip__contact mdl-color--teal mdl-color-text--white'>
                    <img className='mdl-chip__contact' src={host.image} alt=''></img>
                  </span>
                  <span className='mdl-chip__text'>
                    <Link to={`/user/${host._id}`}>
                      {host.firstName} {host.lastName}
                    </Link>
                  </span>
                </span>
              </div>
            ) : null}
          </div>

          {console.log("guests", this.state.party.guests)}
          {/* <div>
            {guests.map((guest, index) => {
              return (
                <ul>
                  <li key={index}>{guest._id}</li>
                </ul>

                // <span class='mdl-chip mdl-chip--contact'>
                //   <span class='mdl-chip__contact mdl-color--teal mdl-color-text--white'>
                //     <img class='mdl-chip__contact' src={host.image} alt=''></img>
                //   </span>
                //   <span class='mdl-chip__text'>
                //     <Link to={`/user/${host}`}>
                //       {guest.firstName} {guest.lastName}
                //     </Link>
                //   </span>
                // </span>
              );
            })}
          </div> */}
          <div className='map'>
            <iframe
              title='myMap'
              frameBorder='0'
              style={{ width: "100%", height: "300px" }}
              src={url}
            ></iframe>
          </div>
          {this.state.partyJoined ? (
            <div>
              <button
                className='mui-btn mui-btn--raised mui-btn--danger'
                type='submit'
                onClick={() => {
                  this.leave();
                }}
              >
                Leave
              </button>
            </div>
          ) : (
            <div>
              <button
                className='mui-btn mui-btn--raised mui-btn--primary'
                type='submit'
                onClick={() => {
                  this.join();
                }}
              >
                Join
              </button>
            </div>
          )}
        </div>
        <BottomNavbar />
      </div>
    );
  }
}
export default withAuth(ShowParties);
