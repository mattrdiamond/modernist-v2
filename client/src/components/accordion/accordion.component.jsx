import React from "react";
import "./accordion.styles.scss";

const Accordion = ({ title, toggle, expandedTitle, children }) => {
  const breakpoint = 630;

  const handleToggle = () => {
    console.log("handletoggle");
    if (window.innerWidth > breakpoint) return;
    toggle(title);
  };

  const isOpen = title === expandedTitle ? true : false;

  return (
    <>
      <div className="accordion-title-container" onClick={handleToggle}>
        <h4 className="accordion-title">{title}</h4>
        <button
          className={`toggle-button${!isOpen ? " collapsed" : ""}`}
          onClick={handleToggle}
        />
      </div>
      <div className={`accordion-content${!isOpen ? " collapsed" : ""}`}>
        {children}
      </div>
    </>
  );
};

export default Accordion;
