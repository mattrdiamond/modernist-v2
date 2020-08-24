import React from "react";
import "./hamburger-button.styles.scss";

//react.memo used to prevent render every time search or shop button clicked (desktop view)
const HamburgerButton = React.memo(({ isOpen, handleToggle }) => {
  console.log("render hamburger");

  return (
    <div
      className={"hamburger" + (isOpen ? " is-open" : "")}
      onClick={handleToggle}
      role="button"
      aria-pressed={isOpen ? true : false}
      tabIndex="0"
    >
      <div className="hamburger-btn">
        <div className="hamburger-bar"></div>
      </div>
    </div>
  );
});

export default HamburgerButton;
