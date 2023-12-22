import React from "react";
import "./promo-banner.styles.scss";

const PromoBanner = ({ promoCode }) => (
  <div className='promo-banner'>
    <span className='promo-text'>
      Get&nbsp;
      <span className='font-bold'>20% off</span> your purchase
      with&nbsp;code&nbsp;
      <span className='font-bold'>{promoCode}</span>
    </span>
  </div>
);

export default PromoBanner;
