import React from "react";
import PropTypes from "prop-types";
import Spinner from "../spinner/spinner.component";
import CustomButton from "./custom-button.component";
import { generateButtonClasses } from "./custom-button.component";
import "./custom-button-with-spinner.styles.scss";

const CustomButtonWithSpinner = ({
  children,
  isLoading,
  buttonStyle = "",
  ...otherProps
}) => {
  const buttonClasses = `
  custom-button
  with-spinner
  ${generateButtonClasses(buttonStyle)}
  ${isLoading ? "loading" : ""}`
    .trim()
    .replace(/\s+/g, " ");

  return (
    <CustomButton className={buttonClasses} {...otherProps}>
      {isLoading && <Spinner stroke={5} />}
      <span className={`button-text${isLoading ? " loading" : ""}`}>
        {children}
      </span>
    </CustomButton>
  );
};

export default CustomButtonWithSpinner;

CustomButtonWithSpinner.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired,
  buttonStyle: PropTypes.string,
};
