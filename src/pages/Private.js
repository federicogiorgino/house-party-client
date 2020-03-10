import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import { Link } from "react-router-dom";

import BottomNavbar from "../components/BottomNavbar";

class Private extends Component {
  render() {
    return (
      <div className='mui-container'>
        <div className='text-center p-10'>
          <div className='light-text'>
            <h1>Search in these cities</h1>
          </div>
          <div className='filter-grid '>
            <div className='img-filter'>
              <Link to={"parties/city/San%20Francisco"}>
                <img src={require("../img/icons/013-golden gate.svg")} alt='' />
                <p className='img-filter-label'>San Francisco</p>
              </Link>
            </div>
            <div className='img-filter'>
              <Link to={"parties/city/Barcelona"}>
                <img src={require("../img/icons/003-sagrada familia.svg")} alt='' />
                <p className='img-filter-label'>Barcelona</p>
              </Link>
            </div>
            <div className='img-filter'>
              <Link to={"parties/city/Berlin"}>
                <img src={require("../img/icons/004-brandenburg gate.svg")} alt='' />
                <p className='img-filter-label'>Berlin</p>
              </Link>
            </div>
            <div className='img-filter'>
              <Link to={"parties/city/Rome"}>
                <img src={require("../img/icons/034-Colosseum.svg")} alt='' />
                <p className='img-filter-label'>Rome</p>{" "}
              </Link>
            </div>
            <div className='img-filter'>
              <Link to={"parties/city/Moscow"}>
                <img src={require("../img/icons/006-grand mosque.svg")} alt='' />
                <p className='img-filter-label'>Moscow</p>{" "}
              </Link>
            </div>
            <div className='img-filter'>
              <Link to={"parties/city/Rio%20De%20Janeiro"}>
                <img src={require("../img/icons/005-christ the redeemer.svg")} alt='' />
                <p className='img-filter-label'>Rio De Janeiro</p>{" "}
              </Link>
            </div>
            <div className='img-filter'>
              <Link to={"parties/city/Paris"}>
                <img src={require("../img/icons/010-eiffel tower.svg")} alt='' />
                <p className='img-filter-label'>Paris</p>{" "}
              </Link>
            </div>
            <div className='img-filter'>
              <Link to={"parties/city/London"}>
                <img src={require("../img/icons/003-big ben.svg")} alt='' />
                <p className='img-filter-label'>London</p>{" "}
              </Link>
            </div>
            <div className='img-filter'>
              <Link to={"parties/city/New%20York%20City"}>
                <img src={require("../img/icons/029-statue of liberty.svg")} alt='' />
                <p className='img-filter-label'>New York City</p>{" "}
              </Link>
            </div>
          </div>
        </div>

        <BottomNavbar />
      </div>
    );
  }
}

export default withAuth(Private);
