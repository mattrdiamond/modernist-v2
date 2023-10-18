import React from "react";
import PropTypes from "prop-types";

export default function AccordionTitle({
  children,
  onClick,
  isCollapsed,
  titleId,
}) {
  return (
    <div
      className='accordion-title-container'
      onClick={onClick}
      role='button'
      aria-expanded={!isCollapsed}
    >
      <h4 className='accordion-title' id={titleId}>
        {children}
      </h4>
      <div className='toggle-button' />
    </div>
  );
}

AccordionTitle.propTypes = {
  children: PropTypes.node.isRequired, // The content of the title.
  onClick: PropTypes.func.isRequired, // Function to handle click events.
  isCollapsed: PropTypes.bool.isRequired, // Indicates if the accordion is collapsed.
  titleId: PropTypes.string.isRequired, // The ID for the title element, for use with aria-labelledby.
};
