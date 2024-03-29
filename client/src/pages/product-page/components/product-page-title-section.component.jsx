import React from "react";
import PropTypes from "prop-types";
import { productDetailType } from "../../../sharedPropTypes/sharedPropTypes";
import StarRatingWithSku from "../../../components/star-rating/star-rating-with-review-count.component";
import AfterPayLogo from "../../../assets/icons/afterpay.svg";
import Icon from "../../../components/icon/icon.component";
import ProductTag from "../../../components/product-tag/product-tag.component";
import "./product-page-title-section.styles.scss";

export default function ProductPageTopContent({
  product: { name, rating, review_count, sku, tags },
  priceWithOptions,
}) {
  return (
    <div className='product-page-top-wrapper'>
      {tags && Object.keys(tags).length > 0 && <ProductTag tags={tags} />}
      <h1 className='product-title'>{name}</h1>
      {rating && (
        <StarRatingWithSku
          rating={rating}
          maxRating={5}
          reviewCount={review_count}
          sku={sku}
          starSize='0.95rem'
        />
      )}
      <p className='product-price'>${priceWithOptions.toFixed(2)}</p>
      <p className='price-installments'>
        {`Or 4 payments of $${(priceWithOptions / 4).toFixed(2)} with`}
        <img
          src={AfterPayLogo}
          alt='after pay logo'
          className='icon icon-afterpay'
        />
        <Icon icon='information' title='information' />
      </p>
    </div>
  );
}

ProductPageTopContent.propTypes = {
  product: productDetailType.isRequired,
  priceWithOptions: PropTypes.number.isRequired,
};
