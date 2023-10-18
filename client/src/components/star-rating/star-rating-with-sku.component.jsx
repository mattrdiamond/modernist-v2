import React from "react";
import StarRating from "./star-rating.component";
import PropTypes from "prop-types";
import "./star-rating-with-sku.styles.scss";

export default function StarRatingWithSku({ sku, reviewCount, ...props }) {
  return (
    <div className='star-rating-sku-wrapper'>
      <StarRating {...props} />
      <span className='review-count'>({reviewCount || 0} Reviews)</span>
      <span className='pipe-spacer'>|</span>
      <span className='product-sku'>SKU: {sku}</span>
    </div>
  );
}

StarRatingWithSku.propTypes = {
  sku: PropTypes.number.isRequired,
  reviewCount: PropTypes.number,
};
