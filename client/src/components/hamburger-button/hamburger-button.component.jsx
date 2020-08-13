import React from "react";
import "./hamburger-button.styles.scss";

const HamburgerButton = ({
  isVisible,
  openNav,
  closeNavStart,
  isAnimating,
}) => {
  const handleClick = () => {
    if (!isVisible) return openNav();
    return closeNavStart();
  };

  return (
    <div
      className={"hamburger" + (isVisible && !isAnimating ? " is-open" : "")}
      onClick={handleClick}
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
