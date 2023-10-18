import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import StarRatingWithSku from "../../components/star-rating/star-rating-with-sku.component";

import "./product-page-top-content.styles.scss";

export default function ProductPageTopContent({
  item: { name, rating, review_count, sku, price },
  collectionId,
}) {
  return (
    <div className='product-page-top-wrapper'>
      <Link to={`/shop/${collectionId}`}>
        <span className='collection-name'>{collectionId}</span>
      </Link>
      <h1 className='product-title'>{name}</h1>
      <StarRatingWithSku
        rating={rating}
        maxRating={5}
        reviewCount={review_count}
        sku={sku}
        starSize='0.95rem'
      />
      <p className='product-price'>${price.toFixed(2)}</p>
    </div>
  );
}

ProductPageTopContent.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rating: PropTypes.number,
    review_count: PropTypes.number.isRequired,
    sku: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  collectionId: PropTypes.string.isRequired,
};
