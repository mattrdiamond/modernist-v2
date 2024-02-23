import React, { useState, useEffect, useMemo } from "react";
import slides from "./hero-slideshow-data.json";
import { navbarHeight } from "../../../../utils/constants";
import HeroSlide from "./hero-slide.component";
import Slideshow from "../../../../components/slideshow/slideshow.component";
import { useWindowSize } from "../../../../contexts/WindowSizeContext";
import "./hero-slideshow.styles.scss";

const calculateContainerHeight = (navbarHeight, isMobile) => {
  if (isMobile) {
    return `${window.visualViewport.height - navbarHeight}px`;
  } else {
    return null;
  }
};

export default function HeroSlideshow() {
  const { width } = useWindowSize();

  const isMobile = useMemo(() => width <= 450, [width]);

  const [containerHeight, setContainerHeight] = useState(
    calculateContainerHeight(navbarHeight, isMobile)
  );

  useEffect(() => {
    if (isMobile) {
      setContainerHeight(calculateContainerHeight(navbarHeight, isMobile));
    } else if (containerHeight !== null) {
      setContainerHeight(null);
    }
  }, [width, isMobile, containerHeight]);

  return (
    <div className='hero-slideshow' style={{ height: containerHeight }}>
      <Slideshow interval={4000} showNavButtons darkenBottom autoPlay>
        {slides.map((slide) => (
          <HeroSlide key={slide.id} {...slide} />
        ))}
      </Slideshow>
    </div>
  );
}
