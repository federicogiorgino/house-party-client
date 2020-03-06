import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import BottomNavbar from "../components/BottomNavbar";

class Private extends Component {
  render() {
    return (
      <div className='private-container'>
        <div className='cities'>
          <div>
            <h3>Search in these cities</h3>
          </div>
          <div className='img-grid'>
            <div>
              <img src={require("../img/amsterdam.svg")} alt='' />
              <p>Amsterdam</p>
            </div>
            <div>
              <img src={require("../img/barcelona.svg")} alt='' />
              <p>Barcelona</p>
            </div>
            <div>
              <img src={require("../img/germany.svg")} alt='' />
              <p>Berlin</p>
            </div>
            <div>
              <img src={require("../img/rome.svg")} alt='' />
              <p>Rome</p>
            </div>
            <div>
              <img src={require("../img/russia.svg")} alt='' />
              <p>Moscow</p>
            </div>
            <div>
              <img src={require("../img/zurich.svg")} alt='' />
              <p>Zurich</p>
            </div>
            <div>
              <img src={require("../img/paris.svg")} alt='' />
              <p>Paris</p>
            </div>
            <div>
              <img src={require("../img/beach.svg")} alt='' />
              <p>Miami</p>
            </div>
            <div>
              <img src={require("../img/architecture-and-city.png")} alt='' />
              <p>New York City</p>
            </div>
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }
}

export default withAuth(Private);
