import React from "react";
import "./promo-banner.styles.scss";

const PromoBanner = ({ promoCode }) => (
  <div className="promo-banner">
    <span className="promo-text">
      Get 20% off your entire purchase with code{" "}
      <span className="promo-code">{promoCode}</span>
    </span>
  </div>
);

export default PromoBanner;
