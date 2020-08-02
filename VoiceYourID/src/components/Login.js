import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { Link } from "react-router-dom";
import Axios from "axios";
import $ from "jquery";
import auth from "./Firebase";
import firebase from "firebase/app";
import "./login.css";

export default class Login extends Component {
  state = {
    myname: "",
    myemail: "",
    myusername: "",
  };
  componentDidMount() {
    var elem = document.querySelector(".modal");
    M.Modal.init(elem);
  }
  handleclick = (e) => {
    var username = $("#email").find("input:text").val();
    var pass = $("#password").find("input:password").val();
    Axios.get("https://myapi.radiantdaman.com/db/" + username).then((res) => {
      this.setState({ myname: res.data.name });
      this.setState({ myemail: res.data.email });
      this.setState({ myusername: res.data.username });
      if (res.data.username) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.state.myemail, pass)
          .catch((e) => {
            var errorCode = e.code;
            var errorMessage = e.message;
            M.toast({
              html: "<div>Invalid Username Or Password</div>",
            });
          });
      } else {
        M.toast({ html: "Invalid Username Or Password" });
      }
    });
  };
  render() {
    return (
      <div>
        <div data-target="signinmodal" className="modal-trigger">
          <a className={this.props.color.toString() + "-text"}>
            {this.props.name}
          </a>
        </div>
        <div>
          <div className="row">
            <div id="signinmodal" className="modal">
              <div
                className="modal-content logpage"
                style={{
                  border: "0.5px #00897b solid",
                  // padding:"50px 80px 10px 80px"
                }}
              >
                <div className="center-align blue-greyfontFamily:" Pacifico>
                  <h4 style={{ color: "#00897b" }}>Login</h4>
                </div>
                <div
                  className=""
                  style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 5 }}
                >
                  <hr
                    style={{
                      border: "0.5px rgba(0, 77, 64, 1) solid ",
                      width: "50%",
                    }}
                  ></hr>
                </div>
                <div
                  id="email"
                  className="input-field"
                  style={{
                    paddingLeft: 30,
                    paddingRight: 50,
                    paddingTop: "10px",
                  }}
                >
                  <input
                    style={{
                      border: "0.5px #00897b solid",
                      paddingLeft: 10,
                      paddingRight: 10,
                      // color: "black",
                    }}
                    placeholder="Username"
                    type="text"
                    id="username"
                    className="validate inputer"
                  ></input>
                </div>
                <div
                  id="password"
                  className="input-field"
                  style={{
                    paddingLeft: 30,
                    paddingRight: 50,
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  <input
                    style={{
                      border: "0.5px #00897b solid",
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                    placeholder="Password"
                    type="password"
                    id="password"
                    className="validate"
                  ></input>
                </div>
                <div
                  className="modal-footer"
                  style={{
                    backgroundColor: "rgba(0,0,0,0)",
                    padding: "0px 30px 10px 10px",
                  }}
                >
                  <a
                    onClick={this.handleclick}
                    className="btn waves-effect waves-light modal-close teal darken-5"
                  >
                    {this.props.name}
                    <i className="material-icons right">send</i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
