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
    const { _id, title, guestLimit, city, date } = this.props;
    return (
      <div className='container'>
        <h5>{title}</h5>
        <p>{guestLimit}</p>
        <p>{city}</p>
        <p>{this.formatDate(date)}</p>
        {/* link to the party specific */}
        <Link to={`/parties/${_id}`}>link</Link>
      </div>
    );
  }
}

export default PartyCard;
