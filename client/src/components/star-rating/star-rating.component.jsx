import React from "react";
import Icon from "../icon/icon.component";
import "./star-rating.styles.scss";

const StarRating = ({ rating, maxRating, reviewCount }) => {
  const starPercentage = (rating / maxRating) * 100;

  // Round to nearest 10%
  const starPercentageRounded = Math.round(starPercentage / 10) * 10;

  // Create a group of 5 stars
  const starArray = Array.from({ length: maxRating }, (_, i) => (
    <span className="star" key={i} aria-hidden="true">
      <Icon icon="star" />
    </span>
  ));

  return (
    <div className="star-rating">
      <span className="stars-background" aria-hidden="true">
        {starArray}
      </span>
      <span
        className="stars-fill"
        style={{ clipPath: `inset(0 ${100 - starPercentageRounded}% 0 0)` }}
        role="img"
        aria-label={`Rating: ${rating} out of ${maxRating} stars`}
      >
        {starArray}
      </span>
      <span className="review-count">{reviewCount} reviews</span>
    </div>
  );
};

// Memoize StarRating to prevent re-render every time product page updates
export default React.memo(StarRating);
