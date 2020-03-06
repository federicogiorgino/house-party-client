import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import { Link } from "react-router-dom";

import userService from "../lib/user-service";
import partiesService from "../lib/parties-service";

import BottomNavbar from "../components/BottomNavbar";

class ShowParties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: {},
      partyJoined: false
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    const { user } = this.props;

    partiesService
      .getOne(id)
      .then(event => {
        this.setState({ event });
      })
      .catch(error => console.log(error));
  }

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
    const { user } = this.props;
    const { host, title, description, guestLimit, city, address, date } = this.state.event;
    return (
      <div>
        <div className='container'>
          <img
            src='https://images.pexels.com/photos/1449795/pexels-photo-1449795.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            alt=''
            height='40%'
          />
          <p>Party Name{title}</p>
          <p>Description{description}</p>
          <p>Maximum Guests: {guestLimit}</p>
          <p>Where: {city}</p>
          <p>{address}</p>
          <p>When:{formatDate(date)}</p>
          <p>{host}</p>
        </div>
        <BottomNavbar />
      </div>
    );
  }
}
export default withAuth(ShowParties);
