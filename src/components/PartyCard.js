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
      <div>
        <div class='container'>
          <div class='row'>
            <div class='col-md-6 col-sm-8 col-xs-12 col-md-offset-3 col-sm-offset-2 party-card'>
              <div class='card'>
                <div class='image'>
                  <img src={image} width='100%' />
                </div>

                <div class='text'>
                  <div class='fab'>
                    {" "}
                    <Link to={`/parties/${_id}`}>&#43; </Link>
                  </div>
                  <h3>{title}</h3>
                  <p>0/{guestLimit} guests</p>
                  <p>
                    {city} - {this.formatDate(date)}
                  </p>
                  <div className='chip-container'>
                    <p>Host</p>
                    <div class='chip'>
                      <img src='https://s3.amazonaws.com/uifaces/faces/twitter/rogie/48.jpg' />
                      <span class='chip-name'>{host}</span>
                      <span class='chip-button-close' role='button'>
                        {" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PartyCard;
