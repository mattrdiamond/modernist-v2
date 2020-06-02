import React from "react";
import "./with-spinner.scss";

// WithSpinner higher order component - passing a component into WithSpinner function
// will wrap that component in new spinner component and give it new props (isLoading)
// and return a spinner or the original component based on the isLoading prop value
const WithSpinner = (WrappedComponent) => ({
  isLoading,
  height,
  ...otherProps
}) => {
  return isLoading ? (
    <div className="spinner-overlay" style={{ height: height || "" }}>
      <div className="spinner-container"></div>
    </div>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinner;
