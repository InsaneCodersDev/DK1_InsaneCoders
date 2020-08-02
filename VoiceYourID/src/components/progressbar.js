import React, { Component } from "react";
import Axios from "axios";
import $ from "jquery";
import M from "materialize-css/dist/js/materialize.min.js";
import "./progressbar.css";

export default class ProgressBar extends Component {
  state = {
    background: "linear-gradient(to right,#bbe1fa,#0f4c75)",
    percentage: 75,
    text: "January",
  };
  componentDidMount() {
    const progress = document.querySelector(".progress-donein");
    progress.style.opacity = 1;
    progress.style.width = this.state.percentage + "%";
  }

  render() {
    return (
      <div className="Month">
        {this.props.text}
        <div class="progressin">
          <div class="progress-donein" data-done="75">
            {this.state.percentage}%
          </div>
        </div>
      </div>
    );
  }
}
