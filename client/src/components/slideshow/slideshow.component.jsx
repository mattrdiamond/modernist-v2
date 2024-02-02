import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { slidePropType } from "../../sharedPropTypes/sharedPropTypes";
import useIntersectionObserver from "../../hooks/use-intersection-observer";

import SlideshowNavButtons from "./slideshow-nav-buttons.component";
import "./slideshow.styles.scss";

export default function Slideshow({
  children,
  className,
  interval,
  showNavButtons,
  darkenBottom,
  autoPlay,
}) {
  const [currentSlide, setCurrentSlide] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.25,
  });

  // Convert children prop into an array to ensure it's safely iterable
  const slides = React.Children.toArray(children);

  useEffect(() => {
    // set the current slide after component mounts to trigger any animations associated with .active class
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    let timer;
    if (autoPlay) {
      timer = setInterval(() => {
        if (!isPaused) {
          setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }
      }, interval);
    }

    return () => clearInterval(timer);
  }, [isPaused, interval, autoPlay, slides.length]);

  useEffect(() => {
    setIsPaused(!isIntersecting);
  }, [isIntersecting]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div
      className={`slideshow-wrapper ${className || ""}`}
      ref={targetRef}
      aria-live='polite'
    >
      {slides.map((child, index) => (
        <div
          key={index}
          className={`slide-${index + 1} ${
            index === currentSlide ? "active" : "inactive"
          }`}
          aria-hidden={index !== currentSlide}
        >
          {child}
        </div>
      ))}
      {showNavButtons && (
        <SlideshowNavButtons
          slides={slides}
          currentSlide={currentSlide}
          goToSlide={goToSlide}
          darkenBottom={darkenBottom}
        />
      )}
    </div>
  );
}

Slideshow.propTypes = {
  children: slidePropType.isRequired,
  className: PropTypes.string,
  interval: PropTypes.number,
  showNavButtons: PropTypes.bool,
  darkenBottom: PropTypes.bool,
  autoPlay: PropTypes.bool,
};

Slideshow.defaultProps = {
  className: "",
  interval: 4000,
  showNavButtons: false,
  darkenBottom: false,
  autoPlay: false,
};
