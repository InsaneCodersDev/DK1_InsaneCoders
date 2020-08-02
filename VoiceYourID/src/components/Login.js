import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { Link } from "react-router-dom";
import Axios from "axios";
import $ from "jquery";
import auth from "./Firebase";
import firebase from "firebase/app";

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
      firebase.auth().signInWithEmailAndPassword(this.state.myemail, pass);
    });
  };
  render() {
    return (
      <div>
        <div data-target="signinmodal" className=" modal-trigger">
          <a className={this.props.color.toString() + "-text"}>
            {this.props.name}
          </a>
        </div>
        <div className="container">
          <div className="row">
            <div id="signinmodal" className="modal">
              <div
                className="modal-content"
                style={{
                  border: "1px rgba(102,153,204,1) solid",
                  marginTop: 15,
                  marginBottom: 15,
                  marginRight: 15,
                  marginLeft: 15,
                }}
              >
                <div className="center-align blue-grey-text">
                  <h4 style={{ color: "rgba(102,153,204,1)" }}>
                    {this.props.name}
                  </h4>
                </div>
                <div
                  className=""
                  style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 5 }}
                >
                  <hr
                    style={{ border: "0.5px rgba(102,153,204,1) solid" }}
                  ></hr>
                </div>
                <div
                  id="email"
                  className="input-field"
                  style={{ paddingLeft: 30, paddingRight: 50, paddingTop: 70 }}
                >
                  <input
                    style={{
                      border: "0.5px rgba(102,153,204,1) solid",
                      paddingLeft: 10,
                      paddingRight: 10,
                      color: "black",
                    }}
                    placeholder="Username"
                    type="text"
                    id="username"
                    className="validate"
                  ></input>
                </div>
                <div
                  id="password"
                  className="input-field"
                  style={{
                    paddingLeft: 30,
                    paddingRight: 50,
                    paddingTop: 10,
                    paddingBottom: 30,
                  }}
                >
                  <input
                    style={{
                      border: "0.5px rgba(102,153,204,1) solid",
                      paddingLeft: 10,
                      paddingRight: 10,
                      color: "black",
                    }}
                    placeholder="Password"
                    type="password"
                    id="password"
                    className="validate"
                  ></input>
                </div>
                <div className="modal-footer" style={{ paddingBottom: 60 }}>
                  <a
                    onClick={this.handleclick}
                    className="btn waves-effect waves-light modal-close"
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
