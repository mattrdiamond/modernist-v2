import React, { useState } from "react";
import PropTypes from "prop-types";

export default function AccordionGroup({
  children,
  initialOpen,
  allowMultipleOpen = false,
}) {
  const [openAccordions, setOpenAccordions] = useState(
    initialOpen ? [initialOpen] : []
  );

  const handleToggle = (title) => {
    if (openAccordions.includes(title)) {
      setOpenAccordions(openAccordions.filter((acc) => acc !== title));
    } else {
      if (allowMultipleOpen) {
        setOpenAccordions([...openAccordions, title]);
      } else {
        setOpenAccordions([title]);
      }
    }
  };

  return (
    <div className='accordion-group'>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          openAccordion: openAccordions.includes(child.props.title)
            ? child.props.title
            : null,
          toggle: handleToggle,
        })
      )}
    </div>
  );
}

AccordionGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element.isRequired),
    PropTypes.element.isRequired,
  ]), // The individual accordion items.
  initialOpen: PropTypes.string, // The title of the accordion item to be initially open.
  allowMultipleOpen: PropTypes.bool, //  Whether multiple accordion items can be open at the same time.
};
