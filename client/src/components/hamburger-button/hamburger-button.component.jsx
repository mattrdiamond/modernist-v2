import React from "react";
import "./hamburger-button.styles.scss";

// React.memo prevents wasted render every time search or shop button clicked (desktop view)
const HamburgerButton = React.memo(({ isOpen, handleToggle }) => (
  <div
    className={"hamburger" + (isOpen ? " is-open" : "")}
    onClick={handleToggle}
    onKeyDown={handleToggle}
    role='button'
    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
    aria-expanded={isOpen ? true : false}
    tabIndex='0'
  >
    <div className='hamburger-btn'>
      <div className='hamburger-bar'></div>
    </div>
  </div>
));

export default HamburgerButton;
