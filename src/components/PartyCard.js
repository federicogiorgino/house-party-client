import React, { Component } from "react";
import { Link } from "react-router-dom";

class PartyCard extends Component {
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
    const { _id, title, guestLimit, city, date, host, image } = this.props;
    return (
      <div className='mui-container'>
        <div className='demo-card-wide mdl-card mdl-shadow--2dp'>
          <div
            className='mdl-card__title'
            style={{
              background: `url( ${
                image ? image : "https://www.americanexpress.lk/images/placeholder-600x600.jpg"
              } `,
              backgroundSize: "contain"
            }}
          ></div>
          <div className='mdl-card__supporting-text'>
            <h3>{title}</h3>
            <p>
              Max Guests {guestLimit} - {city} - {this.formatDate(date)}
            </p>
            {host ? (
              <div className='chip-container'>
                <p>Hosted By</p>
                <span className='mdl-chip mdl-chip--contact'>
                  <span className='mdl-chip__contact mdl-color--teal mdl-color-text--white'>
                    <img className='mdl-chip__contact' src={host.image} alt=''></img>
                  </span>
                  <span className='mdl-chip__text'>
                    {host.firstName} {host.lastName}
                  </span>
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default PartyCard;
