import React from "react";
import PropTypes from "prop-types";
import { slidePropType } from "../shared/sharedPropTypes";

import "./slideshow-nav-buttons.styles.scss";

export default function SlideshowNavButtons({
  slides,
  currentSlide,
  goToSlide,
  darkenBottom,
}) {
  return (
    <div className='slideshow-nav-wrapper'>
      <div className='slideshow-nav-buttons'>
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`nav-button ${
              currentSlide === index ? "active" : "inactive"
            }`}
            aria-label={`Slide ${index + 1}`}
            aria-pressed={currentSlide === index ? "true" : "false"}
          />
        ))}
      </div>
      {darkenBottom && <div className='bottom-fade' />}
    </div>
  );
}

SlideshowNavButtons.propTypes = {
  slides: slidePropType.isRequired,
  currentSlide: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([null]),
  ]),
  goToSlide: PropTypes.func.isRequired,
  darkenBottom: PropTypes.bool,
};
