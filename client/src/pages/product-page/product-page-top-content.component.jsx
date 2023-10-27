import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import StarRatingWithSku from "../../components/star-rating/star-rating-with-sku.component";
import AfterPayLogo from "../../assets/icons/afterpay.svg";
import Icon from "../../components/icon/icon.component";
import "./product-page-top-content.styles.scss";

export default function ProductPageTopContent({
  product: { name, rating, review_count, sku, collection },
  priceWithOptions,
}) {
  return (
    <div className='product-page-top-wrapper'>
      <Link to={`/shop/${collection}`}>
        <span className='collection-name'>{collection}</span>
      </Link>
      <h1 className='product-title'>{name}</h1>
      <StarRatingWithSku
        rating={rating}
        maxRating={5}
        reviewCount={review_count}
        sku={sku}
        starSize='0.95rem'
      />
      <p className='product-price'>${priceWithOptions.toFixed(2)}</p>
      <p className='price-installments'>
        {`Or 4 payments of $${(priceWithOptions / 4).toFixed(2)} with`}
        <img
          src={AfterPayLogo}
          alt='after pay logo'
          className='icon icon-afterpay'
        />
        <Icon icon='information' />
      </p>
    </div>
  );
}

ProductPageTopContent.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rating: PropTypes.number,
    review_count: PropTypes.number.isRequired,
    sku: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    collection: PropTypes.string.isRequired,
  }).isRequired,
};
