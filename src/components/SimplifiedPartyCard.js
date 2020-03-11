import React, { Component } from "react";
import { Link } from "react-router-dom";

class SimplifiedPartyCard extends Component {
  //function to format Date THANKS CAPU
  formatDate = d => {
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

  render() {
    const { _id, title, guestLimit, city, date, host } = this.props;
    return (
      <div className='mui-container'>
        {host ? (
          <div className='demo-card-wide mdl-card mdl-shadow--2dp' style={{ minHeight: "auto" }}>
            <div className='mdl-card__supporting-text'>
              <h3>{title}</h3>
              <p>
                Max Guests {guestLimit} - {city} - {this.formatDate(date)}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default SimplifiedPartyCard;
