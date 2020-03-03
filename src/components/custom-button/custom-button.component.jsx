import React from "react";
import "./custom-button.styles.scss";

// otherProps includes button type (submit, etc.) and value (submit form)
// children -> <CustomButton>children</CustomButton>
const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
  <button
    className={`${isGoogleSignIn ? "google-sign-in" : ""} custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
