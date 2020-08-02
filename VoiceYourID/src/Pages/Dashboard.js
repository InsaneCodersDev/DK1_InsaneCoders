import React, { Component } from "react";
import Navbar from "../components/Navbar";
import firebase from "firebase/app";
import Axios from "axios";
import $ from "jquery";
import M from "materialize-css/dist/js/materialize.min.js";
import wave from "../assets/wavepaused4.gif";
import "./Dashboard.css";
import Push from "push.js";
import myicon from "../assets/icon.png";

export default class Dashboard extends Component {
  state = {
    navdata: [
      { id: 1, name: "Voice ID", logo: "mic", link: "/" },
      { id: 2, name: "Location", logo: "place", link: "/Location" },
      { id: 3, name: "Attendance", logo: "event", link: "/Attendance" },
      { id: 4, name: "Report", logo: "report", link: "/Report" },
      { id: 5, name: "Train", logo: "person_add", link: "/Train" },
    ],
    username: "Unknown",
    response: "Nope....",
    class:
      " green darken-4 pulse btn-floating halfway-fab waves-effect waves-light btn-large",
    count: 1,
    name: "",
    currentimage: wave,
    curentstate: "Mark My Attendance",
    myname: "",
    myemail: "",
    myusername: "",
    myuserid: "",
    recogname: "",
    recording: "",
    lat: 0,
    lng: 0,
    access: false,
    grant: false,
  };
  componentDidMount() {
    var btn = document.getElementById("rbtn");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user logged in" + user.email);
        this.setState({ username: user.email });
        Axios.get(
          "https://myapi.radiantdaman.com/db/email/" + this.state.username
        ).then((res) => {
          this.setState({ myname: res.data.name });
          this.setState({ myemail: res.data.email });
          this.setState({ myusername: res.data.username });
          this.setState({ myuserid: res.data.userid });
          Axios.get(
            "https://myapi.radiantdaman.com/grant/" + this.state.myusername
          ).then((data) => {
            if (data.data.toString() === "under grant") {
              this.setState({
                curentstate: "Grant Period",
              });
              var elem = document.querySelector("#cnt");
              elem.innerHTML = "Enter office to mark your attendance";
              this.setState({ grant: true });
              btn.classList.add("disabledhidden");
            }
          });
        });
      }
    });
    window.setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.setState({ lat: position.coords.latitude });
            this.setState({ lng: position.coords.longitude });
            if (
              position.coords.accuracy === 150 ||
              position.coords.accuracy <= 10
            ) {
              btn.classList.add("disabled");
              btn.classList.remove("pulse");
            } else {
              if (this.state.grant === true) {
                var dist = [];
                dist.push(this.findDistance(19.114973, 72.839685));
                dist.push(this.findDistance(19.0737303, 72.8614216));
                console.log(dist);
                dist.sort(function (a, b) {
                  return a - b;
                });
                var d = dist[0];
                if (d <= 30) {
                  Axios.get(
                    "https://myapi.radiantdaman.com/mark/" +
                      this.state.myusername
                  ).then((res) => {
                    console.log(res.data);
                    this.setState({
                      curentstate: res.data,
                    });
                  });
                }
              } else {
                btn.classList.remove("disabled");
                btn.classList.add("pulse");
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
    var elem = document.querySelector(".modal");
    M.Modal.init(elem);
    window.scrollTo(0, 0);
  }
  handleClick = (e) => {
    var dist = [];
    dist.push(this.findDistance(19.114973, 72.839685));
    dist.push(this.findDistance(19.0737303, 72.8614216));
    console.log(dist);
    dist.sort(function (a, b) {
      return a - b;
    });
    var d = dist[0];
    this.setState({
      class:
        "red darken-4 btn-floating halfway-fab waves-effect waves-light btn-large",
    });
    var waver = document.querySelector(".siri-out");
    waver.style.opacity = 0;
    this.setState({ response: "Recording" });
    this.setState({ curentstate: "Recording" });
    console.log(d);
    if (d <= 30) {
      console.log("Accepted");
      window.setTimeout(this.record(), 500);
      this.setState({ access: true });
    } else {
      console.log("You Are Outside Premises");
      window.setTimeout(this.record(), 500);
    }
  };
  record = () => {
    var chunks = [];
    window.navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((mediastream) => {
        var media = new MediaRecorder(mediastream);
        media.start();
        console.log(media.state);
        window.setTimeout(() => {
          media.stop();
          console.log(media.state);
          media.onstop = (ev) => {
            var blob = new Blob(chunks, { type: "audio/wav;" });
            chunks = [];
            var aurl = window.URL.createObjectURL(blob);
            console.log(aurl);
            this.setState({ response: "Recognizing..." });
            this.setState({ curentstate: "Recognizing..." });
            this.setState({ recording: aurl });
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = aurl;
            a.download = this.state.myusername + ".wav";
            a.click();
            fetch("https://myapi.radiantdaman.com/api", {
              method: "post",
              body: blob,
            })
              .then((res) => {
                return res.text();
              })
              .then((data) => {
                console.log(data);
                this.setState({ response: data });
                var waver = document.querySelector(".siri-out");
                waver.style.opacity = 1;
                data = data.replace(/[\r\n]+/gm, "");
                if (
                  data === this.state.myusername &&
                  this.state.access === true
                ) {
                  Axios.get(
                    "https://myapi.radiantdaman.com/mark/" +
                      this.state.myusername
                  ).then((res) => {
                    console.log(res.data);
                    this.setState({
                      curentstate: res.data,
                    });
                    Push.create("Voice Your ID", {
                      body: "Your Attendance Is Marked",
                      icon: myicon,
                      onClick: function () {
                        window.focus();
                        this.close();
                      },
                    });
                  });
                } else {
                  console.log("Your Attendance is Not Marked");
                  this.setState({
                    curentstate: "Attendance Not Marked ",
                  });
                }
                this.setState({ recogname: data });
                this.setState({
                  class:
                    "green darken-4 pulse btn-floating halfway-fab waves-effect waves-light btn-large",
                });
              });
          };
        }, 2000);
        media.ondataavailable = function (ev) {
          chunks.push(ev.data);
        };
      });
  };
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
        className="dashboardcontent bg-contact100"
        style={{ touchAction: "none" }}
      >
        <Navbar
          title="Voice Your ID"
          navicons={this.state.navdata}
          login="true"
          email={this.state.myemail}
          name={this.state.myname}
          username={this.state.myusername}
          color="rgba(0,0,0,0.75)"
          userid={this.state.myuserid}
        ></Navbar>
        <div
          className="container hide-on-large-only"
          style={{ paddingTop: "12vh" }}
        ></div>
        <div className="container" style={{ marginTop: 50 }}>
          <div className="row">
            <div className="col s12 m8 offset-m2">
              <div className="card">
                <div className="card-image siri">
                  <img
                    className="siri-out"
                    src={this.state.currentimage}
                    style={{ borderBottom: "black solid", opacity: 1 }}
                  />
                  <span className="card-title">{this.state.curentstate}</span>
                  <button
                    style={{ justifyContent: "center" }}
                    className={this.state.class}
                    onClick={this.handleClick}
                    id="rbtn"
                  >
                    <i className="material-icons">mic</i>
                  </button>
                </div>
                <div className="card-content">
                  <p id="cnt">
                    Say <b>"My Name Is {this.state.myusername}"</b>
                    <br></br>
                    {this.state.recogname}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
