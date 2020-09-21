import React from "react";
import "./accordion.styles.scss";

const Accordion = ({ title, toggle, expandedTitle, children }) => {
  const breakpoint = 740;

  const handleToggle = () => {
    console.log("toggle");
    if (window.innerWidth > breakpoint) return;
    toggle(title);
  };

  console.log("render accordion");
  return (
    <div className="accordion-component">
      <div className="accordion-title-container" onClick={handleToggle}>
        <h4 className="accordion-title">{title}</h4>
        <div
          className={`toggle-button${
            title !== expandedTitle ? " collapsed" : ""
          }`}
        />
      </div>
      <div
        className={`accordion-content${
          title !== expandedTitle ? " collapsed" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
