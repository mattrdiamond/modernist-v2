import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import CustomButton from "../custom-button/custom-button.component";
import "./section-heading.styles.scss";

export default function SectionHeading({
  heading,
  subheading,
  buttonText,
  linkDestination,
}) {
  const history = useHistory();
  return (
    <div className='section-heading-wrapper'>
      <div className='section-heading-text'>
        <h2 className='heading'>{heading}</h2>
        {subheading && <p className='subheading grey-text'>{subheading}</p>}
      </div>
      {linkDestination && (
        <CustomButton textButton onClick={() => history.push(linkDestination)}>
          {buttonText}
        </CustomButton>
      )}
    </div>
  );
}

SectionHeading.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  buttonText: PropTypes.string,
  linkDestination: PropTypes.string,
};
