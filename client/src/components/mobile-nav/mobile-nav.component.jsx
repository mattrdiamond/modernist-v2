import React from "react";

import "./mobile-nav.styles.scss";

const MobileNav = ({ isAnimating, isVisible, closeNavStart }) => {
  console.log("render mobileNav");

  return (
    <div
      className={"mobile-nav-directory" + (isAnimating ? " is-closing" : "")}
    >
      <div className="inner">
        <p className="test">1</p>
        <p className="test">2</p>
        <p className="test">3</p>
        <p className="test">4</p>
        <p className="test">5</p>
        <p className="test">6</p>
        <p className="test">7</p>
        <p className="test">8</p>
      </div>
    </div>
  );
};

export default MobileNav;
