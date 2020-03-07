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
      <Link className='party-card' to={`/parties/${_id}`}>
        <div className='party-container'>
          <div className='img-container'>
            <img src={image} alt='' />
          </div>
          <div className='info-container'>
            <h5>{title}</h5>
            <p>Guests: {guestLimit}</p>
            <p>
              {city} {this.formatDate(date)}
            </p>
            <p>
              Hosted by{" "}
              <div className='chip'>
                <img
                  src='https://fanatical.imgix.net/product/original/02a4f984-1c89-4046-93f1-a3994bb9faf9.jpeg?auto=compress,format&w=400&fit=max'
                  alt=''
                />
                {host}
              </div>
            </p>
          </div>
        </div>
      </Link>
    );
  }
}

export default PartyCard;
