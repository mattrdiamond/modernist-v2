import React from "react";
import "./custom-button.styles.scss";

// otherProps includes button type (i.e. submit) and value (submit form)
// children -> <CustomButton>children</CustomButton>
const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  ...otherProps
}) => (
  <button
    className={`${inverted ? "inverted" : ""} ${
      isGoogleSignIn ? "google-sign-in" : ""
    } custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
