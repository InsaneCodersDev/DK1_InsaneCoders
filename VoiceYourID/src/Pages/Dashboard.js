import React, { Component } from "react";
import Navbar from "../components/Navbar";
import firebase from "firebase/app";
import Axios from "axios";
import $ from "jquery";
import M from "materialize-css/dist/js/materialize.min.js";
import wave from "../assets/wavepaused4.gif";
import "./Dashboard.css";
import Push from "push.js";

export default class Dashboard extends Component {
  state = {
    navdata: [
      { id: 1, name: "Voice ID", logo: "mic", link: "/" },
      { id: 2, name: "Location", logo: "place", link: "/Location" },
      { id: 3, name: "Attendance", logo: "event", link: "/Attendance" },
      { id: 4, name: "Report", logo: "report", link: "/Report" },
      { id: 5, name: "Train", logo: "train", link: "/Train" },
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
    myusername: "Mohnish",
    recogname: "",
    recording: "",
  };
  componentDidMount() {
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
        });
      }
    });
    var elem = document.querySelector(".modal");
    M.Modal.init(elem);
    window.scrollTo(0, 0);
  }
  handleClick = (e) => {
    this.setState({
      class:
        "red darken-4 btn-floating halfway-fab waves-effect waves-light btn-large",
    });
    var waver = document.querySelector(".siri-out");
    waver.style.opacity = 0;
    this.setState({ response: "Recording" });
    this.setState({ curentstate: "Recording" });
    window.setTimeout(this.record(), 500);
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
                if (data === this.state.myusername) {
                  console.log("Your Attendance is Marked");
                  this.setState({ curentstate: "Your Attendance is Marked" });
                  Push.create("Voice Your ID", {
                    body: "Your Attendance Is Marked",
                  });
                } else {
                  console.log("Your Attendance is Not Marked");
                  this.setState({
                    curentstate: "Your Attendance is Not Marked ",
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
  // upload = () => {
  //   var chunks = [];
  //   window.navigator.mediaDevices
  //     .getUserMedia({ audio: true, video: false })
  //     .then((mediastream) => {
  //       var media = new MediaRecorder(mediastream);
  //       media.start();
  //       console.log(media.state);
  //       window.setTimeout(() => {
  //         media.stop();
  //         console.log(media.state);
  //         media.onstop = (ev) => {
  //           var blob = new Blob(chunks, { type: "audio/wav;" });
  //           chunks = [];
  //           var aurl = window.URL.createObjectURL(blob);
  //           console.log(aurl);
  //           this.setState({ response: "uploading" });
  //           this.setState({ curentstate: "uploading" });
  //           fetch(
  //             "https://myapi.radiantdaman.com/upload/" +
  //               this.state.count +
  //               "/" +
  //               this.state.name,
  //             {
  //               method: "post",
  //               body: blob,
  //             }
  //           )
  //             .then((res) => {
  //               return res.text();
  //             })
  //             .then((data) => {
  //               console.log(data);
  //             });
  //         };
  //       }, 2000);
  //       media.ondataavailable = function (ev) {
  //         chunks.push(ev.data);
  //       };
  //     });
  // };
  // handleUpload = (e) => {
  //   this.setState({ count: 1 });
  //   var newname = $("#username").find("input:text").val();
  //   this.setState({ name: newname });
  //   this.setState({ response: "recording 1st time" });
  //   this.upload(this.state.count);
  //   window.setTimeout(() => {
  //     this.setState({ response: "recording 2nd time" });
  //     this.setState({ count: 2 });
  //     this.upload(this.state.count);
  //   }, 2500);
  //   window.setTimeout(() => {
  //     this.setState({ response: "recording 3rd time" });
  //     this.setState({ count: 3 });
  //     this.upload(this.state.count);
  //   }, 5000);
  //   window.setTimeout(() => {
  //     this.setState({ response: "recording 4th time" });
  //     this.setState({ count: 4 });
  //     this.upload(this.state.count);
  //   }, 7500);
  //   window.setTimeout(() => {
  //     this.setState({ response: "recording 5th time" });
  //     this.setState({ count: 5 });
  //     this.upload(this.state.count);
  //   }, 10000);
  //   window.setTimeout(() => {
  //     Axios.get(
  //       "https://myapi.radiantdaman.com/adduser/" + this.state.name
  //     ).then((res) => {
  //       this.setState({ response: this.state.name + " added successfully" });
  //     });
  //   }, 12500);
  // };

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
                  >
                    <i className="material-icons">mic</i>
                  </button>
                </div>
                <div className="card-content">
                  <p>
                    Say <b>"My Voice Is My ID"</b>
                    <br></br>
                    {this.state.recogname}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container">
          <button
            data-target="modal2"
            className="btn-floating waves-effect waves lighten right modal-trigger"
          >
            UP
          </button>
        </div>
        <div id="modal2" className="modal">
          <div className="modal-content">
            <h4>Enter Username</h4>
            <div id="username" className="input-field">
              <input
                placeholder="Your Name"
                type="text"
                className="validate"
              ></input>
            </div>
            <div className="modal-footer">
              <button
                className="btn-floating waves-effect waves lighten modal-close"
                onClick={this.handleUpload}
              >
                Add User
              </button>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}
