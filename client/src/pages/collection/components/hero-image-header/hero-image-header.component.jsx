import React from "react";
import PropTypes from "prop-types";

import ImageReloader from "../../../../components/image-loader/image-reloader.component";
import "./hero-image-header.styles.scss";

export default function HeroImageHeader({ title, heroImages }) {
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
        <span className='subtitle'>for every style & space</span>
      </div>
    </div>
  );
}

HeroImageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  heroImages: PropTypes.shape({
    large: PropTypes.string.isRequired,
    small: PropTypes.string.isRequired,
  }).isRequired,
};
