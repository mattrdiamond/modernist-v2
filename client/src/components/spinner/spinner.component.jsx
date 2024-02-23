import React from "react";
import "./spinner.scss";

const Spinner = ({ height, width, stroke = 3 }) => (
  <div
    className='spinner-overlay'
    style={{ height: height || "", width: width || "" }}
  >
    <svg className='spinner' viewBox='0 0 50 50'>
      <circle
        className='spinner-path'
        cx='25'
        cy='25'
        r='20'
        fill='none'
        strokeWidth={stroke}
      ></circle>
    </svg>
  </div>
);

export default Spinner;
