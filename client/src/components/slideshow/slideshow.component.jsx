import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { slidePropType } from "../../sharedPropTypes/sharedPropTypes";
import useIntersectionObserver from "../../hooks/use-intersection-observer";

import SlideshowNavButtons from "./slideshow-nav-buttons.component";
import "./slideshow.styles.scss";

export default function Slideshow({
  children,
  className = "",
  interval = 4000,
  showNavButtons = false,
  darkenBottom = false,
  autoPlay = false,
}) {
  const [currentSlide, setCurrentSlide] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const timerIdRef = useRef(null);

  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.125,
  });

  // Convert children prop into an array to ensure it's safely iterable
  const slides = useMemo(() => React.Children.toArray(children), [children]);

  const startAutoPlayTimer = useCallback(() => {
    if (autoPlay) {
      return setInterval(() => {
        if (!isPaused) {
          setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }
      }, interval);
    }
  }, [autoPlay, interval, isPaused, slides.length]);

  useEffect(() => {
    // set the current slide after component mounts to trigger any animations associated with .active class
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    // reset interval timer when dependencies change
    clearInterval(timerIdRef.current);
    timerIdRef.current = startAutoPlayTimer();

    return () => clearInterval(timerIdRef.current);
  }, [isPaused, interval, autoPlay, slides.length, startAutoPlayTimer]);

  useEffect(() => {
    setIsPaused(!isIntersecting);
  }, [isIntersecting]);

  const goToSlide = useCallback(
    (index) => {
      setCurrentSlide(index);
      clearInterval(timerIdRef.current);
      timerIdRef.current = startAutoPlayTimer();
    },
    [startAutoPlayTimer]
  );

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
