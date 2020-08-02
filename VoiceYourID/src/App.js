import React, { Component } from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import "materialize-css/dist/css/materialize.min.css";
import Location from "./components/Location";
import Login from "./components/Login";
import Report from "./components/Report";
import Dashboard from "./Pages/Dashboard";
import firebase from "firebase/app";
import Attendance from "./components/Attendance";
import Train from "./components/Attendance1";

class App extends Component {
  state = {
    component: Home,
  };
  componentDidMount() {
    // this.handlePath()
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user logged in");
        this.setState({ component: Dashboard });
      } else {
        console.log("user logged out");
        this.setState({ component: Home });
      }
    });
  }

  render() {
    return (
      <div className="App">
        {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
        <BrowserRouter>
          <Route exact path="/" component={this.state.component}></Route>
          <Route path="/Location" component={Location}></Route>
          <Route path="/Login" component={Login}></Route>
          <Route path="/Attendance" component={Attendance}></Route>
          <Route path="/Report" component={Report}></Route>
          <Route path="/Train" component={Train}></Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
