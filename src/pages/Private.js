import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import BottomNavbar from "../components/BottomNavbar";

class Private extends Component {
  render() {
    return (
      <div>
        <div className='filter-page'>
          <div>
            <h3>Search in these cities</h3>
          </div>
          <div className='filter-grid '>
            <div className='img-filter'>
              <img src={require("../img/icons/013-golden gate.svg")} alt='' />
              <p className='img-filter-label'>San Francisco</p>
            </div>
            <div className='img-filter'>
              <img src={require("../img/icons/003-sagrada familia.svg")} alt='' />
              <p className='img-filter-label'>Barcelona</p>
            </div>
            <div className='img-filter'>
              <img src={require("../img/icons/004-brandenburg gate.svg")} alt='' />
              <p className='img-filter-label'>Berlin</p>
            </div>
            <div className='img-filter'>
              <img src={require("../img/icons/034-Colosseum.svg")} alt='' />
              <p className='img-filter-label'>Rome</p>
            </div>
            <div className='img-filter'>
              <img src={require("../img/icons/006-grand mosque.svg")} alt='' />
              <p className='img-filter-label'>Moscow</p>
            </div>
            <div className='img-filter'>
              <img src={require("../img/icons/005-christ the redeemer.svg")} alt='' />
              <p className='img-filter-label'>Sao Paulo</p>
            </div>
            <div className='img-filter'>
              <img src={require("../img/icons/010-eiffel tower.svg")} alt='' />
              <p className='img-filter-label'>Paris</p>
            </div>
            <div className='img-filter'>
              <img src={require("../img/icons/003-big ben.svg")} alt='' />
              <p className='img-filter-label'>London</p>
            </div>
            <div className='img-filter'>
              <img src={require("../img/icons/029-statue of liberty.svg")} alt='' />
              <p className='img-filter-label'>New York City</p>
            </div>
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }
}

export default withAuth(Private);
