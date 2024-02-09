import React from "react";
import PropTypes from "prop-types";
import { heroBannerPropType } from "../../../../sharedPropTypes/sharedPropTypes";

import ImageReloader from "../../../../components/image-loader/image-reloader.component";
import "./hero-image-header.styles.scss";

export default function HeroImageHeader({ title, subtitle, heroImages }) {
  const { large, small } = heroImages;
  return (
    <div className={`hero-image-header ${title.toLowerCase()}`}>
      <ImageReloader
        src={small}
        srcSet={`${small} 1x, ${large} 2x`}
        alt={title}
        styles='background-img'
      />
      <div className='header-text-container'>
        <h1 className='collection-title'>{title}</h1>
        {subtitle && <span className='subtitle'>{subtitle}</span>}
      </div>
    </div>
  );
}

HeroImageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  heroImages: heroBannerPropType.isRequired,
};