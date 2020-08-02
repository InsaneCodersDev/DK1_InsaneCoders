import React, { Component } from "react";
import Navbar from "./Navbar";
import Axios from "axios";
import $ from "jquery";
import M from "materialize-css/dist/js/materialize.min.js";
import firebase from "firebase/app";

export default class Train extends Component {
  state = {
    navdata: [
      { id: 1, name: "Voice ID", logo: "mic", link: "/" },
      { id: 2, name: "Location", logo: "place", link: "/Location" },
      { id: 3, name: "Attendance", logo: "event", link: "/Attendance" },
      { id: 4, name: "Report", logo: "report", link: "/Report" },
      { id: 5, name: "Train", logo: "train", link: "/Train" },
    ],
    response: "Nope....",
    myname: "",
    myemail: "",
    myusername: "Mohnish",
    count: 1,
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
          document.getElementById("yourusername").value = this.state.myusername;
          console.log(res);
        });
      }
    });
    // var elem = document.querySelector(".modal");
    // M.Modal.init(elem);
  }
  upload = () => {
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
            this.setState({ response: "uploading" });
            this.setState({ curentstate: "uploading" });
            fetch(
              "https://myapi.radiantdaman.com/upload/" +
                this.state.count +
                "/" +
                this.state.myusername,
              {
                method: "post",
                body: blob,
              }
            )
              .then((res) => {
                this.setState({
                  response:
                    this.state.count.toString() + " Done, Keep On Training!",
                });
                this.setState({ count: this.state.count + 1 });
                if (this.state.count === 11) {
                  console.log("uploading to server");
                  this.setState({ response: "Pls Wait...Uploading To Server" });
                  Axios.get(
                    "https://myapi.radiantdaman.com/adduser/" +
                      this.state.myusername
                  ).then((res) => {
                    this.setState({
                      response: this.state.myusername + " added successfully",
                    });
                    this.setState({ count: 1 });
                  });
                }
                return res.text();
              })
              .then((data) => {
                console.log(data);
              });
          };
        }, 2000);
        media.ondataavailable = function (ev) {
          chunks.push(ev.data);
        };
      });
  };
  handleUpload = (e) => {
    // var newname = $("#username").find("input:text").val();
    // this.setState({ name: newname });
    // var i = 1;
    // var w = window.setInterval(() => {
    //   if (i === 10) {
    //     window.clearInterval(w);
    //   }
    //   this.setState({ response: "recording " + i.toString() + " time" });
    //   this.setState({ count: i });
    //   this.upload(this.state.count);
    //   i = i + 1;
    // }, 2250);
    // window.setTimeout(() => {
    //   Axios.get(
    //     "https://myapi.radiantdaman.com/adduser/" + this.state.name
    //   ).then((res) => {
    //     this.setState({ response: this.state.name + " added successfully" });
    //   });
    // }, 11 * 2250);

    this.setState({
      response: "recording " + this.state.count.toString() + " time",
    });
    this.upload(this.state.count);
  };
  render() {
    return (
      <div className="autoclose" style={{ overflow: "hidden" }}>
        <Navbar
          title="Voice Your ID"
          titlelink="/"
          navicons={this.state.navdata}
          login="true"
          email={this.state.myemail}
          name={this.state.myname}
          username={this.state.myusername}
        ></Navbar>
        <h1>{this.state.response}</h1>
        <div className="container">
          <button
            data-target="modal2"
            className="btn-floating waves-effect waves lighten right modal-trigger"
            onClick={this.handleUpload}
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
                id="yourusername"
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
        </div>
        <p>My Name Is {this.state.myusername}</p>
      </div>
    );
  }
}
