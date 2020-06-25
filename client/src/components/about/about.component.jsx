import React from "react";
import Icon from "../icon/icon.component";
import "./about.styles.scss";

const About = () => (
  <section className="about-component">
    <div className="ribbon">
      <Icon icon="logomark" />
    </div>
    <div className="about-content page-width">
      <h2>Simplicity is the ultimate sophistication.</h2>
      <p className="about-text">
        Good design is obvious. Great design is transparent. No matter what
        style is trending right now, minimalism is here to stay. From
        mid-century classics to today’s icons, our furniture is tested for
        quality and built to last. We’re happy you’re here. Thanks for shopping
        with us!
      </p>
    </div>
  </section>
);

export default About;
