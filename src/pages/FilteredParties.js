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
      <div className='m-bot-20'>
        <div className='mui-container'>
          <div className='mui-panello'>
            {this.state.filteredParties.length === 0 ? (
              <div className='mui-container vh-90 text-center' style={{ color: "white" }}>
                <h2>No parties found in this city</h2>
                <Link to={`/parties/create`}>
                  <h1>Be the first to create one</h1>
                </Link>
              </div>
            ) : (
              this.state.filteredParties

                .map((oneParty, index) => {
                  return (
                    <Link key={index} to={`/parties/${oneParty._id}`}>
                      <PartyCard key={index} {...oneParty} />{" "}
                    </Link>
                  );
                })
                .reverse()
            )}
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }
}
export default FilteredParties;
