import React from "react";
import StarRating from "./star-rating.component";
import PropTypes from "prop-types";
import "./star-rating-with-review-count.styles.scss";

export default function StarRatingWithSku({
  sku,
  reviewCount = 0,
  rating = 0,
  ...props
}) {
  return (
    <div className='star-rating-sku-wrapper'>
      <StarRating rating={rating} {...props} />
      <div className='rating-review-count-container'>
        <span className='total-rating'>{rating.toFixed(1)}</span>

        <span className='pipe-spacer'>|</span>
        <span className='review-count'>{reviewCount} Reviews</span>
      </div>
    </div>
  );
}

StarRatingWithSku.propTypes = {
  sku: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number,
};
