import React from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import CustomButton from "../custom-button/custom-button.component";
import "./error-message.styles.scss";

const errorTypes = {
  loading: "There was a problem loading this page. Please try again later.",
  noItemsFound: "No Items Found.",
  productNotFound: "Product not found. Please check and try again.",
  default: "An error occurred. Please try again later.",
};

const ErrorMessage = ({ errorType }) => {
  const history = useHistory();
  const location = useLocation();

  const errorMessage = errorTypes[errorType] || errorTypes.default;

  const handleGoBack = () => {
    if (history.length > 1) {
      history.goBack();
    } else if (location.pathname.includes("/shop")) {
      history.push("/shop");
    } else {
      history.push("/");
    }
  };

  return (
    <div className='error-message-wrapper page-width'>
      <h2 className='error-heading'>{errorMessage}</h2>
      <CustomButton onClick={handleGoBack}>Go Back</CustomButton>
    </div>
  );
};

export default ErrorMessage;

ErrorMessage.propTypes = {
  errorType: PropTypes.oneOf(Object.keys(errorTypes)),
};
