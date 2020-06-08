import React from "react";
import "./with-spinner.scss";

// WithSpinner higher order component - passing a component into WithSpinner function
// will wrap that component in new spinner component and give it new props (isLoading)
// and return a spinner or the original component based on the isLoading prop value
const Spinner = ({ height }) => (
  <div className="spinner-overlay" style={{ height: height || "" }}>
    <div className="spinner-container"></div>
  </div>
);

export default Spinner;
