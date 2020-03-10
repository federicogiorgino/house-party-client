import React, { Component } from "react";
import partiesService from "../lib/parties-service";
import PartyCard from "../components/PartyCard";
import BottomNavbar from "../components/BottomNavbar";
import { Link } from "react-router-dom";
class ListParties extends Component {
  state = {
    partiesList: [],
    user: {}
  };

  componentDidMount() {
    partiesService
      .getAll()
      .then(allParties => this.setState({ partiesList: allParties }))
      .catch(err => console.log(err));

    // userService
    //   .getOne()
    //   .then(user => this.setState({ user: user }))
    //   .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className='mui-container'>
          <div className='mui-panello'>
            {this.state.partiesList
              .map((oneParty, index) => {
                return (
                  <Link key={index} to={`/parties/${oneParty._id}`}>
                    <PartyCard key={index} {...oneParty} />
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
export default ListParties;
