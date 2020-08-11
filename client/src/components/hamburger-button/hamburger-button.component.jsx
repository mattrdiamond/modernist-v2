import React from "react";
import "./hamburger-button.styles.scss";

const HamburgerButton = ({ isOpen, toggleVisible }) => {
  const handleClick = () => {
    console.log("click");
    toggleVisible();
  };

  return (
    <div
      className={"hamburger" + (isOpen ? " is-open" : "")}
      onClick={handleClick}
      role="button"
      aria-pressed={isOpen ? true : false}
    >
      <div className="hamburger-btn">
        <div className="hamburger-bar"></div>
      </div>
    </div>
  );
};

export default HamburgerButton;
