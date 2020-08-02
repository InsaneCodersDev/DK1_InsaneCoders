import React, { Component } from "react";
import Navbar from "./Navbar";
import "./report.css";
import materializeMin from "materialize-css/dist/js/materialize.min";
import firebase from "firebase/app";
import Axios from "axios";

export default class Report extends Component {
  state = {
    ihtml: "Select File",
    navdata: [
      { id: 1, name: "Voice ID", logo: "mic", link: "/" },
      { id: 2, name: "Location", logo: "place", link: "/Location" },
      { id: 3, name: "Attendance", logo: "event", link: "/Attendance" },
      { id: 4, name: "Report", logo: "report", link: "/Report" },
      { id: 5, name: "Train", logo: "train", link: "/Train" },
    ],
    myname: "",
    myemail: "",
    myusername: "Mohnish",
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
          console.log(res);
          document.getElementById("name").value = this.state.myname;
        });
      }
    });
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      var instances = materializeMin.FormSelect.init(elems, ["Exception,Leave"]);
    });

    let fileInput = document.getElementById("file");
    fileInput.addEventListener("change", this.loader);
  }

  loader = (e) => {
    let file = e.target.files;
    var show = "No File ";
    let output = document.getElementById("selector");
    let output1 = document.getElementById("ficon");
    var f = 0;
    if (file.length >= 1) {
      show = "Uploaded";
      // file.forEach((element) => {
      //   materializeMin.toast({ html: "Uploaded:" + element.name });
      // });
      while (f < file.length) {
        materializeMin.toast({
          html: "Uploaded:" + file[f].name,
          classes: "rounded mytoast",
        });
        f = f + 1;
      }

      output.classList.add("active2");

      output1.style.color = "black";
    } else {
      output.classList.remove("active2");
      output1.style.color = "white";
    }
    this.setState({ ihtml: show });
    console.log(file);
  };
  handleSubmit = (e) => {
    if (
      document.getElementById("subject").value != "" &&
      document.getElementById("message").value != "" &&
      document.querySelector("input[type=file]").files.length != 0
    ) {
      let formData = new FormData();
      formData.append("username", this.state.myusername);
      formData.append("name", this.state.myname);
      formData.append("subject", document.getElementById("subject").value);
      formData.append("message", document.getElementById("message").value);
      formData.append(
        "exceptionfile",
        document.querySelector("input[type=file]").files[0],
        this.state.myusername + ".jpg"
      );
      fetch("https://myapi.radiantdaman.com/db/exception/add", {
        method: "POST",
        body: formData,
      }).then((res) => {
        console.log(
          res.text().then((data) => {
            console.log(data);
            window.alert(data);
          })
        );
      });
    } else {
      window.alert("Pls Fill all Form Details Correctly");
    }
  };
  render() {
    return (
      <div style={{ overflow: "hidden" }} class="bg-contact100 ">
        <Navbar
          title="Voice Your ID"
          titlelink="/"
          navicons={this.state.navdata}
          login="true"
          color="rgba(0,0,0,0.7)"
          email={this.state.myemail}
          name={this.state.myname}
          username={this.state.myusername}
        ></Navbar>
        <div className="container form">
          <div class="wrapperNew">
            <div class="title">
              <h2 className="heading">
                <i
                  class="fa fa-bookmark"
                  style={{ color: "white", paddingRight: "9px" }}
                ></i>
                Report Issues
              </h2>
            </div>
            <div class="contact-form">
              <div class="input-fields">
                <input
                  type="text"
                  class="input"
                  placeholder="Name"
                  name="name"
                  id="name"
                  readonly="true"
                />

<div class="input-field col s12">
    <select >
      <option value="" disabled selected>Choose the Subject</option>
      <option value="1">Exception</option>
      <option value="2">Leave</option>
      
    </select>
    {/* <label>Materialize Select</label> */}
  </div>
                {/* <input
                  type="text"
                  class="input"
                  placeholder="Subject"
                  name="subject"
                  id="subject"
                /> */}
                <div class="msg">
                  <textarea
                    placeholder="Message"
                    name="message"
                    id="message"
                  ></textarea>
                  {/* <div class="btn">send</div> */}
                </div>
                <div className="buttons">
                  {/* <label>Upload Proof for leave</label> */}

                  <div className=" b1 ">
                    <input
                      type="file"
                      name=""
                      id="file"
                      hidden
                      multiple="multiple"
                    ></input>
                    <label className="filein1 f " for="file" id="selector">
                      <i
                        class="fa fa-file "
                        id="ficon"
                        style={{ color: "white", paddingRight: "7px" }}
                      ></i>
                      {this.state.ihtml}
                    </label>
                  </div>

                  <div className=" b2 ">
                    <button
                      class="filein2 send "
                      type="submit"
                      name="action"
                      onClick={this.handleSubmit}
                    >
                      <i
                        class="fa fa-send "
                        style={{ color: "white", paddingRight: "3px" }}
                      ></i>
                      <p id="inline">Send</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
