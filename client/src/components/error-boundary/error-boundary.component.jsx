import React, { Component } from "react";
import CustomButton from "../custom-button/custom-button.component";
import "./error-boundary.styles.scss";

const errorIcon = require("../../assets/icons/404.svg");

export default class ErrorBoundary extends Component {
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
  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    const { hasErrored } = this.state;

    if (hasErrored) {
      return (
        <div className="error-container page-width">
          <img src={errorIcon} alt="page not found" class="error-img" />
          <h2 className="error-title">Oops! This page went&nbsp;missing.</h2>
          <CustomButton inverted>Return Home</CustomButton>
        </div>
      );
    }

    return this.props.children;
  }
}
