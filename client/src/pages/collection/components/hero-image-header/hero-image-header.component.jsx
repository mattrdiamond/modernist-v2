import React from "react";
import PropTypes from "prop-types";
import { responsiveImagePropType } from "../../../../sharedPropTypes/sharedPropTypes";

import ResponsiveImage from "../../../../components/responsive-image/responsive-image.component";
import "./hero-image-header.styles.scss";

export default function HeroImageHeader({ id, title, subtitle, heroImages }) {
  return (
    <div className={`hero-image-header ${id}`}>
      <ResponsiveImage picture={{ ...heroImages, styles: "background-img" }} />
      <div className='header-text-container'>
        <div className='white-box'>
          <h1 className='collection-title'>{title}</h1>
          {subtitle && <span className='subtitle'>{subtitle}</span>}
        </div>
      </div>
    </div>
  );
}

HeroImageHeader.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  heroImages: responsiveImagePropType.isRequired,
};
