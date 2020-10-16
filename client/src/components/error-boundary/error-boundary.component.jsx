import React, { Component } from "react";
import "./error-boundary.styles.scss";
const errorIcon = require("../../assets/icons/404.svg");

// Catches errors and display a fallback UI
class ErrorBoundary extends Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  // catch errors that get thrown within a child component
  static getDerivedStateFromError(error) {
    return {
      hasErrored: true,
    };
  }

  // log the error
  componentDidCatch(error, info) {
    console.log(error);
    console.log("error info:", info);
  }

  render() {
    const { hasErrored } = this.state;

    if (hasErrored) {
      return (
        <div className="error-container page-width">
          <img src={errorIcon} alt="page not found" className="error-img" />
          <h2 className="error-title">Oops! This page went&nbsp;missing.</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
