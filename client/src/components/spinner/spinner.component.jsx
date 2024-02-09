import React from "react";
import "./spinner.scss";

const Spinner = ({ height, width }) => (
  <div
    className='spinner-overlay'
    style={{ height: height || "", width: width || "" }}
  >
    <div className='spinner-container'></div>
  </div>
);

export default Spinner;
