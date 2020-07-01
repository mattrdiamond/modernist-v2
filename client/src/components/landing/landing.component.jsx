import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import {
  landing2x,
  landing1x,
  landingMobile2x,
  landingMobile1x,
} from "../../assets/img/_images";
import "./landing.styles.scss";

const Landing = () => (
  <section className="landing">
    <picture>
      <source
        media="(max-width: 700px)"
        sizes="100vw"
        srcSet={`${landingMobile2x} 2x, ${landingMobile1x} 1x`}
      />
      <source
        media="(min-width: 771px)"
        sizes="100vw"
        srcSet={`${landing2x} 2x, ${landing1x} 1x`}
      />
      <img
        className="landing-img"
        src={landing1x}
        alt="Modern chair with table and lamp"
      />
    </picture>
    <div className="landing-txt-container">
      <div className="landing-txt page-width">
        <div className="landing-txt-inner">
          <span className="landing-subtitle">New Collection</span>
          <h2 className="landing-title">
            A simple touch of
            <br />
            modern elegance.
          </h2>
          <p className="landing-intro">
            Chic, sleek, and thoroughly modern, these timeless pieces showcase
            clean lines and geometric shapes.
          </p>
          <CustomButton inverted>Shop Now</CustomButton>
        </div>
      </div>
    </div>
  </section>
);

export default Landing;
