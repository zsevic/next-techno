import React, { Component } from "react";
import { Link } from "react-router-dom";

import Footer from "./FooterComponent";

export default class AboutComponent extends Component {
  render() {
    return (
      <div>
        <h1>This is AboutComponent</h1>
        <Link to="test">test</Link>
        <a href="/auth/logout">logout</a>
        <Footer />
      </div>
    );
  }
}
