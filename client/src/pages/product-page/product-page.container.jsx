import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectProductReviews } from "../../redux/reviews/reviews.selectors";
import {
  selectProductById,
  selectProductErrorMessage,
} from "../../redux/shop/shop.selectors";
import { toggleCartHidden, addItemToCart } from "../../redux/cart/cart.actions";
import { fetchReviewsStart } from "../../redux/reviews/reviews.actions";
import { fetchProductStart } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import ProductPage from "../../pages/product-page/product-page.component";
import ErrorMessage from "../../components/error-message/error-message.component";

import "./product-page.styles.scss";

const ProductPageWithSpinner = WithSpinner(ProductPage);

const ProductPageContainer = ({
  product,
  fetchProductStart,
  fetchReviewsStart,
  productReviews,
  errorMessage,
  history,
  collectionId,
  itemId,
  ...otherProps
}) => {
  useEffect(() => {
    if (!product) {
      fetchProductStart(itemId);
    }
  }, [product, itemId, fetchProductStart]);

  useEffect(() => {
    if (!productReviews.length) {
      fetchReviewsStart(itemId);
    }
  }, [productReviews.length, itemId, fetchReviewsStart]);

  return (
    <>
      {errorMessage ? (
        <ErrorMessage errorType='productNotFound' />
      ) : (
        <ProductPageWithSpinner
          isLoading={!product || Object.keys(product).length === 0} // Display spinner if product doesn't exist or if the data is not available yet.
          product={product}
          productReviews={productReviews}
          {...otherProps}
        />
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  collectionId: (state, ownProps) => ownProps.match.params.collectionId,
  itemId: (state, ownProps) => ownProps.match.params.itemId,
  product: (state, ownProps) =>
    selectProductById(ownProps.match.params.itemId)(state),
  errorMessage: (state, ownProps) =>
    selectProductErrorMessage(ownProps.match.params.itemId)(state),
  productReviews: (state, ownProps) =>
    selectProductReviews(ownProps.match.params.itemId)(state),
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item, quantity) => dispatch(addItemToCart(item, quantity)),
  toggleCartHidden: () => dispatch(toggleCartHidden()),
  fetchProductStart: (productId) => dispatch(fetchProductStart(productId)),
  fetchReviewsStart: (productId) => dispatch(fetchReviewsStart(productId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPageContainer);
