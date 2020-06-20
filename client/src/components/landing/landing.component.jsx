import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import large from "../../assets/img/landing.jpg";
import "./landing.styles.scss";

const Landing = () => (
  <section className="landing">
    <img className="landing-img" src={large} />
    <div className="landing-txt-container">
      <div className="landing-txt page-width">
        <div className="landing-txt-inner">
          <span className="landing-subtitle">New Collection</span>
          <h2 className="landing-title">A touch of modern luxury.</h2>
          <p>
            Calibre font example paris as evelestia quatus a non re nitam,
            nemquunt m rempelenis doloreped que vit aut ulluptat.
          </p>
          <CustomButton inverted>Test</CustomButton>
        </div>
      </div>
    </div>
  </section>
);

export default Landing;
