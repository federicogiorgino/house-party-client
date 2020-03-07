import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>HOUSE PARTY</h1>
      <img src={require("../img/dancing.svg")} alt='' />
      <Link to={"/signup"}> Signup</Link>
    </div>
  );
}

export default Home;
