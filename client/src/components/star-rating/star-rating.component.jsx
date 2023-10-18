import React from "react";
import Icon from "../icon/icon.component";
import PropTypes from "prop-types";
import "./star-rating.styles.scss";

const StarRating = ({ rating = 0, maxRating = 5, starSize = "1rem" }) => {
  const starPercentage = (rating / maxRating) * 100;
  // Round to nearest 10%
  const starPercentageRounded = Math.round(starPercentage / 10) * 10;

  // Create a group of 5 stars
  const starArray = Array.from({ length: maxRating }, (_, i) => (
    <span className='star' key={i} aria-hidden='true'>
      <Icon icon='star' width={starSize} height={starSize} />
    </span>
  ));

  return (
    <div className='star-rating-wrapper'>
      <div className='star-rating'>
        <span className='stars-background' aria-hidden='true'>
          {starArray}
        </span>
        <span
          className='stars-fill'
          style={{ clipPath: `inset(0 ${100 - starPercentageRounded}% 0 0)` }}
          role='img'
          aria-label={`Rating: ${rating} out of ${maxRating} stars`}
        >
          {starArray}
        </span>
      </div>
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number,
  maxRating: PropTypes.number,
  starSize: PropTypes.string,
};

export default StarRating;
