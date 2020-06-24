import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import desktopLarge from "../../assets/img/landing_2x.jpg";
import desktopSmall from "../../assets/img/landing_1x.jpg";
import mobileLarge from "../../assets/img/landing_mobile_2x.jpg";
import mobileSmall from "../../assets/img/landing_mobile_1x.jpg";
import "./landing.styles.scss";

const Landing = () => (
  <section className="landing">
    {/*tablet portrait*/}
    <picture>
      <source
        media="(max-width: 700px)"
        sizes="100vw"
        srcSet={`${mobileLarge} 2x, ${mobileSmall} 1x`}
      />
      <source
        media="(min-width: 771px)"
        sizes="100vw"
        srcSet={`${desktopLarge} 2x, ${desktopSmall} 1x`}
      />
      <img
        className="landing-img"
        src={desktopSmall}
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
          <p>
            Individually handcrafted with quality materials, these timeless
            pieces showcase modern style and comfort at a price that will
            surprise you.
          </p>
          <CustomButton inverted>Shop Now</CustomButton>
        </div>
      </div>
    </div>
  </section>
);

export default Landing;
