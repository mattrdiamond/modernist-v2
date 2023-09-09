import React from "react";
import Icon from "../icon/icon.component";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import "./about.styles.scss";

const About = () => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    observeOnce: true,
  });

  return (
    <section className='about-component' ref={targetRef}>
      <div className='ribbon-container'>
        <div className={"ribbon" + (isIntersecting ? " visible" : "")}>
          <Icon icon='logomark' />
        </div>
      </div>
      <div className='about-content page-width'>
        <h2>Simplicity is the ultimate sophistication.</h2>
        <p className='about-text'>
          Good design is obvious. Great design is transparent. No matter what
          style is trending right now, minimalism is here to stay. From
          mid-century classics to today’s icons, our furniture is tested for
          quality and built to last. We’re happy you’re here. Thanks for
          shopping with us!
        </p>
      </div>
    </section>
  );
};

export default About;
