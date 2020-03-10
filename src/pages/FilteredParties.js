import React, { Component } from "react";
import partiesService from "../lib/parties-service";
import PartyCard from "../components/PartyCard";
import BottomNavbar from "../components/BottomNavbar";
import { Link } from "react-router-dom";

class FilteredParties extends Component {
  state = {
    filteredParties: [],
    user: {}
  };

  componentDidMount() {
    const city = this.props.match.params.city;

    partiesService
      .getAllByCity(city)
      .then(filteredParties => this.setState({ filteredParties }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className='mui-container'>
          <div className='mui-panello'>
            {this.state.filteredParties

              .map((oneParty, index) => {
                return (
                  <Link key={index} to={`/parties/${oneParty._id}`}>
                    <PartyCard key={index} {...oneParty} />{" "}
                  </Link>
                );
              })
              .reverse()}
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }
}
export default FilteredParties;
