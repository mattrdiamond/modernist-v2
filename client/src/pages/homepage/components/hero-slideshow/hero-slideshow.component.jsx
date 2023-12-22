import React from "react";
import HeroSlide from "./hero-slide.component";
import slides from "./hero-slideshow-data.json";
import Slideshow from "../../../../components/slideshow/slideshow.component";
import "./hero-slideshow.styles.scss";

export default function HeroSlideshow() {
  return (
    <Slideshow
      className='hero-slideshow'
      interval={4000}
      showNavButtons
      darkenBottom
      autoPlay
    >
      {slides.map((slide) => (
        <HeroSlide key={slide.id} {...slide} />
      ))}
    </Slideshow>
  );
}
