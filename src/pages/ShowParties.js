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
    console.log("worrrrrks");

    const { user } = this.props;

    userService
      .getOne(user._id)
      .then(currentUser => {
        console.log("currentUser", currentUser);

        currentUser.attending.forEach(attendingParty => {
          //checks if the attending party id is equal to the id coming from this.props.match.params.id;
          console.log("attendingParty", attendingParty);
          if (attendingParty._id === id) {
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
        this.setState({ party }, () => {
          console.log("party", this.state);
        });
      })
      .catch(error => console.log(error));
  }

  join = () => {
    const id = this.props.user._id;
    const partyId = this.props.match.params.id;

    userService
      .attendParty(id, partyId)
      .then(() => {
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
    const { host, title, description, guestLimit, city, address, date, image } = this.state.party;

    const MY_API = "AIzaSyBqaknflCPQt5yCLxe4U8SbQmR_y36kb1g";
    let url = `https://www.google.com/maps/embed/v1/search?q=${address},+${city}&key=${MY_API}`;

    return (
      <div>
        <div className='event-container'>
          <div className='img-box'>
            {image ? (
              <img src={image} alt='' height='40%' />
            ) : (
              <img
                src='https://zone1-ibizaspotlightsl.netdna-ssl.com/sites/default/files/styles/generic_three_quarter_width/public/article-images/127863/embedded-1493821379.jpg?itok=b_14tLV_'
                alt=''
                height='40%'
              />
            )}
          </div>

          <div className='event-info'>
            <p>Party Name: {title}</p>
            <p>Description: {description}</p>
            <p>Maximum Guests: {guestLimit}</p>
            <p>Where: {city}</p>
            <p>{address}</p>
            <p>When:{formatDate(date)}</p>
            <Link to={`/user/${host}`}>{host}</Link>
          </div>

          <div className='map'>
            <iframe frameBorder='0' style={{ width: "100%", height: "400px" }} src={url}></iframe>
          </div>

          {this.state.partyJoined ? (
            <div>
              <button
                onClick={() => {
                  this.leave();
                }}
              >
                Leave Party
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  this.join();
                }}
              >
                Join Party
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
