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
    className={
      "custom-button" +
      (inverted ? " inverted" : "") +
      (isGoogleSignIn ? " google-sign-in" : "")
    }
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
