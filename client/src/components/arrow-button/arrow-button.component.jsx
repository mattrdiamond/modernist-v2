import React from "react";
import "./arrow-button.styles.scss";

const ArrowButton = ({ isClosed, styleName }) => {
  return (
    <span
      className={
        "arrow-button" +
        (!isClosed ? " open" : "") +
        (styleName ? ` ${styleName}` : "")
      }
    ></span>
  );
};

export default ArrowButton;
