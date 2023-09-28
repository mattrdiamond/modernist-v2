import React from "react";
import PropTypes from "prop-types";
import "./section-heading.styles.scss";

export default function SectionHeading({ heading, subheading }) {
  return (
    <div className='section-heading-wrapper page-width'>
      <h2 className='heading'>{heading}</h2>
      {subheading && <p className='subheading'>{subheading}</p>}
    </div>
  );
}

SectionHeading.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string,
};
