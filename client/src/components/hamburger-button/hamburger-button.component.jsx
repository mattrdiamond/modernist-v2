import React from "react";
import "./hamburger-button.styles.scss";

const HamburgerButton = ({ isVisible, toggleNav }) => {
  return (
    <div
      className={"hamburger" + (isVisible ? " is-open" : "")}
      onClick={toggleNav}
      role="button"
      aria-pressed={isVisible ? true : false}
    >
      <div className="hamburger-btn">
        <div className="hamburger-bar"></div>
      </div>
    </div>
  );
};

export default HamburgerButton;
