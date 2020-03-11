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
      partyJoined: false
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
        //sets the state party to an object with the property of the party with the id from the endpoint
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

    let url = `https://www.google.com/maps/embed/v1/search?q=${this.state.party.address},+${this.state.party.city}&key=${process.env.REACT_APP_GOOGLE_MAPS}`;

    return (
      <div className='mui-container'>
        <div className='mui-panel'>
          <div className='event-info'>
            <h1 style={{ fontWeight: "700" }}>{this.state.party.title}</h1>
            <div className='img-box'>
              {this.state.party.image ? (
                <img src={this.state.party.image} alt='' height='40%' />
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
                {this.state.party.description}
              </p>
            </div>

            <div className='event-info-specific'>
              <p>
                <span>Guests: </span>
                {this.state.party.guests
                  ? `${this.state.party.guests.length} / ${this.state.party.guestLimit}`
                  : null}
              </p>
            </div>

            <div className='event-info-specific'>
              <p>
                <span>Where: </span>
                {this.state.party.city}, {this.state.party.address}
              </p>
            </div>

            <div className='event-info-specific'>
              <p>
                <span>When: </span>
                When: {formatDate(this.state.party.date)}
              </p>
            </div>

            {this.state.party.host ? (
              <div
                className='chip-container'
                style={{ display: "flex", flexWrap: "nowrap", width: "100%" }}
              >
                <span className='mdl-chip mdl-chip--contact'>
                  <span className='mdl-chip__contact mdl-color--teal mdl-color-text--white'>
                    <img
                      className='mdl-chip__contact'
                      src={this.state.party.host.image}
                      alt=''
                    ></img>
                  </span>
                  <span className='mdl-chip__text'>
                    <Link to={`/user/${this.state.party.host._id}`}>
                      {this.state.party.host.firstName} {this.state.party.host.lastName}
                    </Link>
                  </span>
                </span>
              </div>
            ) : null}
          </div>

          <div>
            {this.state.party.guests
              ? this.state.party.guests.map((guest, index) => {
                  return (
                    <ul>
                      <h6>Who is coming</h6>
                      <div
                        className='chip-container'
                        style={{ display: "flex", flexWrap: "nowrap", width: "100%" }}
                      >
                        <span className='mdl-chip mdl-chip--contact'>
                          <span className='mdl-chip__contact mdl-color--teal mdl-color-text--white'>
                            <img className='mdl-chip__contact' src={guest.image} alt=''></img>
                          </span>
                          <span className='mdl-chip__text'>
                            <Link to={`/user/${this.state.party.host._id}`}>
                              {guest.firstName} {guest.lastName}
                            </Link>
                          </span>
                        </span>
                      </div>
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
                })
              : null}
          </div>
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
