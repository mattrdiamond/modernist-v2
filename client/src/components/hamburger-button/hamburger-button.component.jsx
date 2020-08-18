import React from "react";
import "./hamburger-button.styles.scss";

const HamburgerButton = ({ isVisible, handleToggle }) => {
  console.log("isvisible", isVisible);
  return (
    <div
      className={"hamburger" + (isVisible ? " is-open" : "")}
      onClick={handleToggle}
      role="button"
      aria-pressed={isVisible ? true : false}
      tabIndex="0"
    >
      <div className="hamburger-btn">
        <div className="hamburger-bar"></div>
      </div>
    </div>
  );
};

export default HamburgerButton;
