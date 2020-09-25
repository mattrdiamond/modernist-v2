import React from "react";
import Spinner from "../spinner/spinner.component";
import "../spinner/spinner.scss";

// Display a spinner or the original component based on the isLoading prop value
const WithSpinner = (WrappedComponent) => ({
  isLoading,
  height,
  ...otherProps
}) => {
  return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinner;
