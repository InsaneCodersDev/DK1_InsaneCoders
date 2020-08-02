import Navbar from "./Navbar";
import React, { Component } from "react";
import MyMap from "./Map";
import "../Pages/Dashboard.css";
import "./Map.css";
import firebase from "firebase/app";
import Axios from "axios";

export default class AboutUs extends Component {
  state = {
    navdata: [
      { id: 1, name: "Voice ID", logo: "mic", link: "/" },
      { id: 2, name: "Location", logo: "place", link: "/Location" },
      { id: 3, name: "Attendance", logo: "event", link: "/Attendance" },
      { id: 4, name: "Report", logo: "report", link: "/Report" },
      { id: 5, name: "Train", logo: "person_add", link: "/Train" },
    ],
    lat: 0,
    lng: 0,
    content: "Locating...",
    myemail: "",
    myname: "",
    myusername: "",
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user logged in");
        this.setState({ username: user.email });
        Axios.get(
          "https://myapi.radiantdaman.com/db/email/" + this.state.username
        ).then((res) => {
          this.setState({ myname: res.data.name });
          this.setState({ myemail: res.data.email });
          this.setState({ myusername: res.data.username });
          this.setState({ myuserid: res.data.userid });
          console.log(res);
        });
      }
    });
    window.setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (
              position.coords.accuracy === 150 ||
              position.coords.accuracy <= 10
            ) {
              this.setState({
                content:
                  "Dont Use Mock Location " +
                  position.coords.accuracy.toString(),
              });
            } else {
              this.setState({ lat: position.coords.latitude });
              this.setState({ lng: position.coords.longitude });
              var dist = [];
              dist.push(this.findDistance(19.114973, 72.839685));
              dist.push(this.findDistance(19.0737303, 72.8614216));
              dist.sort(function (a, b) {
                return a - b;
              });
              var d = dist[0];
              if (d < 30) {
                this.setState({ content: "You are inside office." });
              } else {
                this.setState({
                  content:
                    "You are outside office - " + parseInt(d - 30).toString(),
                });
              }
            }
          },
          (e) => {
            console.log(e);
          },
          { enableHighAccuracy: true }
        );
      }
    }, 1000);
  }
  findDistance = (lat2, lon2) => {
    var R = 6371e3; // R is earth’s radius
    var lat1 = this.state.lat; // starting point lat
    var lat2 = lat2; // ending point lat
    var lon1 = this.state.lng; // starting point lon
    var lon2 = lon2; // ending point lon
    var lat1radians = this.toRadians(lat1);
    var lat2radians = this.toRadians(lat2);

    var latRadians = this.toRadians(lat2 - lat1);
    var lonRadians = this.toRadians(lon2 - lon1);

    var a =
      Math.sin(latRadians / 2) * Math.sin(latRadians / 2) +
      Math.cos(lat1radians) *
        Math.cos(lat2radians) *
        Math.sin(lonRadians / 2) *
        Math.sin(lonRadians / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c;
    return d;
  };

  toRadians(val) {
    var PI = 3.1415926535;
    return (val / 180.0) * PI;
  }
  render() {
    return (
      <div
        className="autoclose"
        style={{ height: "100vh", touchAction: "none" }}
      >
        <Navbar
          title="Voice Your ID"
          navicons={this.state.navdata}
          login="true"
          color="rgba(0.5,0.5,0.5,0.88)"
          email={this.state.myemail}
          name={this.state.myname}
          username={this.state.myusername}
          userid={this.state.myuserid}
        ></Navbar>
        <MyMap></MyMap>
        <div class="talk-bubble  round right-in float">
          <div class="talktext">
            <p className="flow-text">{this.state.content}</p>
          </div>
        </div>
      </div>
    );
  }
}
