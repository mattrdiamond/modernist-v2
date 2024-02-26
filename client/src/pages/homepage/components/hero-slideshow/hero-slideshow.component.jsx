import React from "react";
import slides from "./hero-slideshow-data.json";
import HeroSlide from "./hero-slide.component";
import Slideshow from "../../../../components/slideshow/slideshow.component";
import "./hero-slideshow.styles.scss";

export default function HeroSlideshow() {
  return (
    <div className='hero-slideshow'>
      <Slideshow interval={4000} showNavButtons darkenBottom autoPlay>
        {slides.map((slide) => (
          <HeroSlide key={slide.id} {...slide} />
        ))}
      </Slideshow>
    </div>
  );
}
