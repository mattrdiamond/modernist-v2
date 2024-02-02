import React from "react";
import PropTypes from "prop-types";
import "./custom-button.styles.scss";

export const buttonStyles = [
  "inverted",
  "white",
  "google-sign-in",
  "submit",
  "text-button",
  "transparent",
];

export const generateButtonClasses = (classes) => {
  return classes
    .split(" ")
    .filter((cls) => buttonStyles.includes(cls))
    .join(" ")
    .trim();
};

const CustomButton = ({ children, buttonStyle = "", ...otherProps }) => {
  const buttonClasses = `custom-button ${generateButtonClasses(buttonStyle)}`;

  return (
    <button className={buttonClasses} {...otherProps}>
      {children}
    </button>
  );
};

export default CustomButton;

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  buttonStyle: PropTypes.string,
};
