import PropTypes from "prop-types";

export const reviewPropTypes = {
  headline: PropTypes.string.isRequired,
  reviewText: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export const reviewsPropTypes = {
  productReviews: PropTypes.arrayOf(
    PropTypes.shape({
      reviewId: PropTypes.string.isRequired,
      productId: PropTypes.number.isRequired,
      ...reviewPropTypes,
    })
  ).isRequired,
  rating: PropTypes.number.isRequired,
};
