import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import M from "materialize-css/dist/js/materialize.min.js";
import "./main.css";
import Attd from "../assets/attd.jpg";
import "./js/main";
import $ from "jquery";
import voiceurid from "../assets/login3.png";
import schoolmobileapp from "../assets/features.jpg";
import abcd from "../assets/contactus.jpg";
import aboutus from "../assets/aboutus.png";
import "./font-awesome.min.css";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    color: "rgba(0,0,0,0.2)",
  };
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    $(".pink-text").click(() => {
      $(".input-field").find("input:text").val("");
      $(".input-field").find("input:password").val("");
    });
  }
  handleScroll = (e) => {
    if (window.scrollY <= 500) {
      this.setState({ color: "rgba(0,0,0,0.2)" });
      $(".temp").css("color", "white");
    } else {
      this.setState({ color: "rgba(255,255,255,0.8)" });
      $(".temp").css("color", "black");
    }
  };
  render() {
    return (
      <div>
        <div>
          <header id="header" className="alt" style={{ height: "100vh" }}>
            <div className="inner">
              <div>
                <h1>Voice your ID</h1>
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "18",
                    textTransform: "none",
                  }}
                >
                  "Your Voice Is your ID"
                </p>
              </div>
            </div>
          </header>
        </div>
        <br />
        <div id="wrapper">
          <section class="main items">
            <article class="item">
              <header>
                <a>
                  <img src={voiceurid} alt="" />
                </a>
                <h4 style={{ fontSize: "1.7rem" }}> LOGIN </h4>
              </header>
              <p id="tooli" className="newbody">
                Mark your attendance with VoiceId or
                <br /> See your attendance history or
                <br /> Retrain your VoiceID
              </p>
              <ul class="actions">
                <li>
                  <a className="button">
                    <Login name="Login" link="/Dashboard" color="white"></Login>
                  </a>
                </li>
              </ul>
            </article>
            <article class="item">
              <header>
                <a href="#">
                  <img src={schoolmobileapp} alt="" />
                </a>
                <h4 style={{ fontSize: "1.7rem" }}>FEATURES</h4>
              </header>
              <p id="regedit" className="newbody">
                New to VoiceYour Id?
                <br /> Check out our Features & Services.
                <br /> Explore VoiceYourID
              </p>
              <ul class="actions">
                <li>
                  <a id="rec" class="button" href="/services.html">
                    Check Out
                  </a>
                </li>
              </ul>
            </article>
            <article class="item">
              <header>
                <a href="#">
                  <img src={abcd} alt="" />
                </a>
                <h4 style={{ fontSize: "1.7rem" }}>CONTACT US</h4>
              </header>
              <p className="newbody">
                Wanna Learn More? <br /> Wanna Enquire or Report?
                <br /> Write to us and get your issues resolved.
              </p>
              <ul class="actions">
                <li>
                  <a href="/contact.html" class="button">
                    Contact
                  </a>
                </li>
              </ul>
            </article>
            <article class="item">
              <header>
                <a href="#">
                  <img src={aboutus} alt="" />
                </a>
                <h4 style={{ fontSize: "1.7rem" }}>ABOUT US</h4>
              </header>
              <p className="newbody">
                We are team <b style={{ color: "white" }}> Insane Coders. </b>
                <br />
                The members are: Janhavi, Ayushi, Mahima
                <br /> Girish, Mohnish and Oveshahmed.
              </p>
              <ul class="actions">
                <li>
                  <a href="/team.html" class="button">
                    More
                  </a>
                </li>
              </ul>
            </article>
          </section>

          <footer id="footer">
            <ul class="icons">
              <li>
                <a href="#" class="icon fa-twitter">
                  <span class="label">Twitter</span>
                </a>
              </li>
              <li>
                <a href="#" class="icon fa-facebook">
                  <span class="label">Facebook</span>
                </a>
              </li>
              <li>
                <a href="#" class="icon fa-instagram">
                  <span class="label">Instagram</span>
                </a>
              </li>
              <li>
                <a href="#" class="icon fa-linkedin">
                  <span class="label">LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="#" class="icon fa-envelope">
                  <span class="label">Email</span>
                </a>
              </li>
            </ul>
            <p class="copyright">&copy; VoiceYourId By Insane Coders</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Home;
