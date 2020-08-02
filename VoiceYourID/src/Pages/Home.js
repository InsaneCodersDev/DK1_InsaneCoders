import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import M from "materialize-css/dist/js/materialize.min.js";
import "./main.css";
import Attd from "../assets/attd.jpg";
import "./js/main";
import $ from "jquery";
import voiceurid from "../assets/voiceurid.jpg";
import schoolmobileapp from "../assets/school-mobile-app.jpg";
import abcd from "../assets/abcd.jpg";
import aboutus from "../assets/aboutus.png";
import "./font-awesome.min.css";

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
          <header id="header" className="alt">
            <div className="inner">
              <div>
                <h1>Voice your ID</h1>
                <i>
                  {" "}
                  <p>" Your VOICE is your Password. "</p>
                </i>
              </div>
            </div>
          </header>
        </div>

        <div id="wrapper">
          <section class="main items">
            <article class="item">
              <header>
                <a>
                  <img src={voiceurid} alt="" />
                </a>
                <h2> LOGIN </h2>
              </header>
              <p id="tooli" className="newbody">
                Already Enrolled with Voice Your ID? <br /> Login and Get
                Started!!!
              </p>
              <ul class="actions">
                <li>
                  <a className="button">
                    <Login name="Login" link="/Dashboard" color="black"></Login>
                  </a>
                </li>
              </ul>
            </article>
            <article class="item">
              <header>
                <a href="#">
                  <img src={schoolmobileapp} alt="" />
                </a>
                <h2>FEATURES</h2>
              </header>
              <p id="regedit" className="newbody">
                New to VoiceYour Id?
                <br /> Check out our Features & Services.
              </p>
              <ul class="actions">
                <li>
                  <a id="rec" class="button">
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
                <h2>CONTACT US</h2>
              </header>
              <p className="newbody">
                Wanna Learn More? <br /> Wanna Enquire or Report?
                <br /> Write to us and get your issues resolved.
              </p>
              <ul class="actions">
                <li>
                  <a href="/mapbasic" class="button">
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
                <h2>ABOUT US</h2>
              </header>
              <p className="newbody">
                Our team name is Insane Coders. The members are Janhavi, Ayushi,
                Mahima, Girish, Mohnish and Oveshahmed.
                <br />
                We have created this website in last 3 days.
              </p>
              <ul class="actions">
                <li>
                  <a href="#" class="button">
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
            <p class="copyright">&copy; VoiceYourId.com By Insane Coders</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Home;
