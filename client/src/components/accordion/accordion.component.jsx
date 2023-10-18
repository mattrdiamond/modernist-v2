import React from "react";
import PropTypes from "prop-types";
import AccordionTitle from "./accordion-title.component";
import "./accordion.styles.scss";

export default function Accordion({
  title,
  customTitle,
  toggle,
  openAccordion,
  children,
  isMobileAccordion,
}) {
  const isCollapsed = title !== openAccordion || openAccordion === null;

  return (
    <div
      className={`accordion-component${isCollapsed ? " collapsed" : ""}${
        isMobileAccordion ? " mobile-only" : ""
      }`}
    >
      <AccordionTitle
        onClick={() => toggle(title)}
        isCollapsed={isCollapsed}
        titleId={title}
      >
        {customTitle ? customTitle : title}
      </AccordionTitle>
      {(isMobileAccordion || !isCollapsed) && (
        <div
          className='accordion-content'
          role='region'
          aria-labelledby={`accordion-title-${title}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

Accordion.propTypes = {
  title: PropTypes.string.isRequired, // The title of the accordion section.
  customTitle: PropTypes.node, // Allows you to insert HTML into the title, e.g., span tags.
  toggle: PropTypes.func.isRequired, // Function to toggle the accordion open/closed.
  openAccordion: PropTypes.string, // The currently expanded accordion (only one open at a time).
  children: PropTypes.node, // The content of the accordion section.
  isMobileAccordion: PropTypes.bool, // Set to true to make it function as an accordion only on mobile.
};
