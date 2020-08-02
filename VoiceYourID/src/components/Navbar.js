import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import tech from "../assets/tech.jpg";
import $ from "jquery";
import "./Navbar.css";
import defaultimage from "../assets/default.jpg";

class Navbar extends Component {
  componentDidMount() {
    var elem = document.querySelector(".sidenav");
    var instance = M.Sidenav.init(elem);
    var elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems);
    $(".bg-contact100").on("click", function () {
      instance.close();
    });
    $(".autoclose").on("click", function () {
      instance.close();
    });
  }
  handleclick = (e) => {
    firebase
      .auth()
      .signOut()
      .then((e) => {
        window.location.reload();
      });
  };
  handleImage = (e) => {
    $("#myprofile").attr("src", defaultimage);
    $("#myprofile2").attr("src", defaultimage);
  };
  handleLog = () => {
    if (this.props.login == "true") {
      return (
        <div className="col">
          <li>
            <img
              className="circle defaultimage"
              src={
                "https://myapi.radiantdaman.com/photo/" + this.props.username
              }
              style={{
                height: 40,
                width: 40,
                marginTop: 13,
              }}
              alt="Image Not Loaded"
              onError={this.handleImage}
              id="myprofile"
            ></img>
          </li>
          <li className="dropblock">
            <ul className="collapsible" style={{ borderStyle: "none" }}>
              <li>
                <div
                  className="collapsible-header white-text"
                  style={{
                    backgroundColor: "rgba(0,0,0,0)",
                    // borderBottom: 0,
                    paddingTop: 13,
                    borderStyle: "none",
                  }}
                >
                  <span className="navblock">{this.props.name}</span>
                </div>
                <div
                  className="collapsible-body myclass"
                  style={{
                    borderStyle: "none",
                  }}
                >
                  <Link to="/" onClick={this.handleclick}>
                    Log Out
                  </Link>
                </div>
              </li>
            </ul>
          </li>
        </div>
      );
    }
  };
  sideNavLog = () => {
    if (this.props.login == "true") {
      return (
        <div
          className="sideblock"
          style={{ paddingTop: 10, paddingBottom: 10 }}
        >
          <li>
            <Link to="" onClick={this.handleclick}>
              <i className="material-icons white-text">exit_to_app</i>
              <a className="white-text">Log Out</a>
            </Link>
          </li>
        </div>
      );
    }
  };
  handleTitleClick = () => {
    window.location.reload();
  };
  render() {
    const { navicons } = this.props;
    const navlist = navicons.map((element) => {
      return (
        <li key={element.id}>
          <Link to={element.link.toString()}>{element.name}</Link>
        </li>
      );
    });
    const navSideList = navicons.map((element) => {
      return (
        <div
          key={element.id}
          className="sideblock"
          style={{ paddingTop: 10, paddingBottom: 10 }}
        >
          <li>
            <Link to={element.link.toString()}>
              <i class="material-icons white-text">{element.logo}</i>
              <a className="white-text">{element.name}</a>
            </Link>
          </li>
        </div>
      );
    });
    return (
      <div>
        <nav className="nav" style={{ backgroundColor: this.props.color }}>
          <div className="nav-wrapper">
            <a data-target="mobilenav" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <div
              className="container"
              style={{ width: "auto", paddingLeft: 50, paddingRight: 50 }}
            >
              <div className="row">
                <div>
                  <Link className="brand-logo" onClick={this.handleTitleClick}>
                    {this.props.title}
                  </Link>
                </div>
                <div>
                  <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {navlist}
                    {this.handleLog()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <ul
          id="mobilenav"
          className="sidenav"
          style={{ backgroundColor: "rgba(15,15,15,0.95)" }}
        >
          <div className="">
            <li style={{ paddingBottom: 10 }}>
              <div className="user-view">
                <div className="background">
                  <img
                    src={tech}
                    style={{
                      maxWidth: "100%",
                      filter: "blur(3px)",
                      opacity: 0.65,
                    }}
                  />
                </div>
                <div style={{ paddingTop: "5%" }}>
                  <img
                    className="circle"
                    src={
                      "https://myapi.radiantdaman.com/photo/" +
                      this.props.username
                    }
                    id="myprofile2"
                  ></img>
                </div>
                <a href="#name">
                  <span
                    className="name white-text"
                    style={{ fontWeight: "bold" }}
                  >
                    {this.props.name + " ( " + this.props.userid + " )"}
                  </span>
                </a>
                <a href="#email">
                  <span className="email white-text">{this.props.email}</span>
                </a>
              </div>
            </li>
            {navSideList}
            {this.sideNavLog()}
          </div>
        </ul>
      </div>
    );
  }
}

export default Navbar;
