import React from "react";
import "./custom-button.styles.scss";

const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  inline,
  ...otherProps
}) => (
  <button
    className={
      "custom-button" +
      (inverted ? " inverted" : "") +
      (isGoogleSignIn ? " google-sign-in" : "") +
      (inline ? " inline" : "")
    }
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
