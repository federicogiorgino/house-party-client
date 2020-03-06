import React, { Component } from "react";
import partiesService from "../lib/parties-service";
import PartyCard from "../components/PartyCard";
import BottomNavbar from "../components/BottomNavbar";

class ListParties extends Component {
  state = {
    partiesList: []
  };

  componentDidMount() {
    partiesService
      .getAll()
      .then(allParties => this.setState({ partiesList: allParties }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='party-page'>
        <div>
          <h3 className='parties-title'>Parties</h3>
          {this.state.partiesList.map((oneParty, index) => {
            return <PartyCard key={index} {...oneParty} />;
          })}
        </div>
        <BottomNavbar />
      </div>
    );
  }
}
export default ListParties;
