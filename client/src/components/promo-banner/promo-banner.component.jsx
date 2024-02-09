import React from "react";
import { promoDataPropType } from "../../sharedPropTypes/sharedPropTypes";
import { shippingThreshold } from "../../utils/constants";

import Slideshow from "../slideshow/slideshow.component";

import "./promo-banner.styles.scss";

const PromoBanner = ({ promoData }) => {
  const promoSlides = Object.values(promoData).map((promo, index) => (
    <div key={promo.code} className='promo-text'>
      {promo.message}
    </div>
  ));

  // Add a static message about free shipping
  promoSlides.push(
    <div key='freeshipping' className='promo-text'>
      {`Free shipping on orders over $${shippingThreshold}`}
    </div>
  );

  return (
    <div className='promo-banner'>
      {promoSlides.length === 1 ? (
        <div className='promo-static-slide'>{promoSlides[0]}</div>
      ) : (
        <Slideshow className='promo-slideshow' autoPlay showNavButtons>
          {promoSlides}
        </Slideshow>
      )}
    </div>
  );
};

export default PromoBanner;

PromoBanner.propTypes = {
  promoData: promoDataPropType.isRequired,
};
