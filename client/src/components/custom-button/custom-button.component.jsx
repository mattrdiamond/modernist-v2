import React from "react";
import "./custom-button.styles.scss";

const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  submit,
  textButton,
  white,
  ...otherProps
}) => {
  const buttonClasses = `
    custom-button
    ${inverted ? "inverted" : ""}
    ${white ? "white" : ""}
    ${isGoogleSignIn ? "google-sign-in" : ""}
    ${submit ? "submit" : ""}
    ${textButton ? "text-button" : ""}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <button className={buttonClasses} {...otherProps}>
      {children}
    </button>
  );
};

export default CustomButton;
