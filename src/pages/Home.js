import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className='mui-container'>
      <div className='mui-panel no-bg' style={{ maxHeight: "100vh" }}>
        <Link to={"/signup"}>
          <img src={require("../img/dancing.svg")} alt='' />
        </Link>
        <br />
        <h1
          style={{ paddingTop: "20px", fontSize: "3rem", color: "whitesmoke", fontWeight: "700" }}
        >
          HOUSE PARTY
        </h1>

       
      </div>
    </div>
  );
}

export default Home;
