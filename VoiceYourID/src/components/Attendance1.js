import React, { Component } from "react";
import Navbar from "./Navbar";
import Axios from "axios";
import $ from "jquery";
import M from "materialize-css/dist/js/materialize.min.js";
import firebase from "firebase/app";
import "./Attendance2.css";
import "./imgProgress.js";
import "./imgProgress.css";
import { Link } from "react-router-dom";

export default class Train extends Component {
  state = {
    navdata: [
      { id: 1, name: "Voice ID", logo: "mic", link: "/" },
      { id: 2, name: "Location", logo: "place", link: "/Location" },
      { id: 3, name: "Attendance", logo: "event", link: "/Attendance" },
      { id: 4, name: "Report", logo: "report", link: "/Report" },
      { id: 5, name: "Train", logo: "person_add", link: "/Train" },
    ],
    myname: "",
    myemail: "",
    myusername: "",
    count: 1,
    otpcount: 1,
    otpstatus: "Enter OTP",
    valid: false,
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

          $(".circlephoto").imgProgress({
            // path to the image
            img_url:
              "https://myapi.radiantdaman.com/photo/" + this.state.myusername,

            // size in pixels
            size: 170,
            // bar size
            barSize: 8,
            // background color
            backgroundColor: "rgb(0, 0, 0,0)",

            // foreground color
            foregroundColor: "rgba(50, 255,0)",

            // CSS background-size property
            backgroundSize: "cover",

            // current percentage value
            percent: 0,
          });
          var elem = document.querySelector("#mymodal");
          var inst = M.Modal.init(elem, { dismissible: false });
          inst.open();
          window.setInterval(() => {
            if (this.state.otpcount === 4) {
              window.location.replace("/");
            }
          }, 1000);
        });
      }
    });
  }
  otpsubmit = () => {
    var elem = document.querySelector("#mymodal");
    var inst = M.Modal.getInstance(elem);
    var entered = document.querySelector("#myotp").value;
    Axios.get(
      "https://myapi.radiantdaman.com/otp/" + this.state.myusername
    ).then((res) => {
      if (res.data.toString() === entered.toString()) {
        this.setState({ valid: true });
        inst.close();
      } else {
        this.setState({
          otpstatus: "Wrong OTP " + this.state.otpcount + " Try Again",
        });
        this.setState({ otpcount: this.state.otpcount + 1 });
      }
    });
  };
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
                if (this.state.count >= 11) {
                  const mssg = document.querySelector("#message");
                  mssg.style.color = "yellow";
                  mssg.innerHTML =
                    this.state.myusername + " Added Successfully";
                  this.setState({ count: 1 });
                  // Axios.get(
                  //   "https://myapi.radiantdaman.com/adduser/" +
                  //     this.state.myusername
                  // ).then((res) => {
                  //   this.setState({
                  //     response: this.state.myusername + " added successfully",
                  //   });
                  //   this.setState({ count: 1 });
                  //   const mssg = document.querySelector("#message");
                  //   mssg.style.color = "rgba(50, 255,0)";
                  //   mssg.innerHTML =
                  //     this.state.myusername + " Added Sucessfully";
                  // });
                }
                return res.text();
              })
              .then((data) => {
                console.log(data);
              });
          };
          $(".circlephoto").imgProgressTo(this.state.count * 10);
        }, 2000);
        media.ondataavailable = function (ev) {
          chunks.push(ev.data);
        };
      });
  };
  handleUpload = (e) => {
    if (this.state.valid === false) {
      return;
    }
    const progress = document.querySelector("#percentage");
    const mic = document.querySelector("#mic");
    const mssg = document.querySelector("#message");
    const prefire = mssg.innerHTML;
    mssg.innerHTML = "Recording Sample " + this.state.count.toString() + "/10";
    mic.classList.remove("green");
    // mic.classList.add("red");
    mic.classList.add("red");
    progress.classList.add("progress-doner");
    mssg.style.color = "red";
    progress.style.opacity = 1;
    progress.style.width = "100%";
    window.setTimeout(() => {
      progress.classList.remove("progress-doner");
      progress.style.width = "0%";
    }, 2500);
    window.setTimeout(() => {
      progress.classList.add("progress-doner");
      mic.classList.remove("red");
      mic.classList.add("green");
      mssg.style.color = "white";
      mssg.innerHTML = prefire;
    }, 2800);
    this.upload(this.state.count);
  };
  render() {
    return (
      <div className=" bg-contact100">
        <Navbar
          title="Voice Your ID"
          titlelink="/"
          navicons={this.state.navdata}
          login="true"
          email={this.state.myemail}
          name={this.state.myname}
          username={this.state.myusername}
          userid={this.state.myuserid}
        ></Navbar>

        <div class="maincard center-align ">
          <div className="circlephoto"></div>

          <p class="say" id="message">
            Say "My Name Is {this.state.myusername}"
          </p>

          <div style={{ display: "flex" }}>
            <div class="mic " style={{ flex: "1" }}>
              <a
                id="mic"
                class="btn-floating btn-large pulse waves-light green darken-4 mic"
                onClick={this.handleUpload}
              >
                <i class="material-icons">mic</i>
              </a>
            </div>
            <div className="progressr" style={{ flex: "3" }}>
              <div className="progress-doner" id="percentage"></div>
            </div>
          </div>
        </div>
        <div id="mymodal" class="modal">
          <div class="modal-content">
            <h4>{this.state.otpstatus}</h4>
            <input
              placeholder="Enter Your OTP Here"
              id="myotp"
              type="text"
              class="validate"
            />
          </div>
          <div class="modal-footer">
            <Link to="/" class="waves-effect waves-green btn-flat">
              Back
            </Link>
            <a
              href="#!"
              class="waves-effect waves-green btn-flat"
              onClick={this.otpsubmit}
            >
              Done
            </a>
          </div>
        </div>
      </div>
    );
  }
}
