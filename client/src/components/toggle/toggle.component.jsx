import React, { useState, useEffect } from "react";
import "./toggle.styles.scss";

const Toggle = ({ title, children }) => {
  // if mobile view, set open to false
  useEffect(() => {
    if (window.innerWidth > 630) return;
    setIsOpen(false);
  }, []);

  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    if (window.innerWidth > 630) return;
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`toggle-title ${isOpen ? "open" : ""}`} onClick={toggle}>
        <h4>{title}</h4>
        <button
          className={`plus-minus-toggle ${!isOpen ? "collapsed" : ""}`}
          onClick={toggle}
        />
      </div>
      <div className={`toggle-content ${!isOpen ? "collapsed" : ""}`}>
        {children}
      </div>
    </>
  );
};

export default Toggle;
