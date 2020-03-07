import React, { Component } from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./pages/Private";
import ShowUsers from "./pages/ShowUsers";
import EditUsers from "./pages/EditUsers";
import CreateParty from "./pages/CreateParty";
import ListParties from "./pages/ListParties";
import ShowParties from "./pages/ShowParties";

import Navbar from "./components/Navbar";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

class App extends Component {
  render() {
    return (
      <div className='App'>
        {/* <Navbar /> */}
        <Switch>
          {/* anon routes */}
          <AnonRoute exact path='/' component={Home} />
          <AnonRoute exact path='/signup' component={Signup} />
          <AnonRoute exact path='/login' component={Login} />
          {/* private routes */}
          <PrivateRoute exact path='/private' component={Private} />
          <PrivateRoute exact path='/user/:id' component={ShowUsers} />
          <PrivateRoute exact path='/user/edit/:id' component={EditUsers} />
          <PrivateRoute exact path='/parties/create' component={CreateParty} />
          <PrivateRoute exact path='/parties' component={ListParties} />
          <PrivateRoute exact path='/parties/:id' component={ShowParties} />
        </Switch>
      </div>
    );
  }
}

export default App;
