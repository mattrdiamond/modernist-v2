import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProductReviews } from "../../redux/reviews/reviews.selectors";
import {
  selectProductById,
  selectProductErrorMessage,
} from "../../redux/shop/shop.selectors";
import { fetchReviewsStart } from "../../redux/reviews/reviews.actions";
import { toggleCartHidden, addItemToCart } from "../../redux/cart/cart.actions";
import { fetchProductStart } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import ProductPage from "../../pages/product-page/product-page.component";
import ErrorMessage from "../../components/error-message/error-message.component";

import "./product-page.styles.scss";

const ProductPageWithSpinner = WithSpinner(ProductPage);

const ProductPageContainer = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => selectProductById(itemId)(state));
  const productReviews = useSelector((state) =>
    selectProductReviews(itemId)(state)
  );
  const errorMessage = useSelector((state) =>
    selectProductErrorMessage(itemId)(state)
  );

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductStart(itemId));
    }
  }, [product, itemId, dispatch]);

  useEffect(() => {
    if (!productReviews.length) {
      dispatch(fetchReviewsStart(itemId));
    }
  }, [productReviews.length, itemId, dispatch]);

  return (
    <>
      {errorMessage ? (
        <ErrorMessage errorType='productNotFound' />
      ) : (
        <ProductPageWithSpinner
          isLoading={!product || Object.keys(product).length === 0} // Display spinner if product doesn't exist or if the data is not available yet.
          product={product}
          productReviews={productReviews}
          addItemToCart={(item, quantity) =>
            dispatch(addItemToCart(item, quantity))
          }
          toggleCartHidden={() => dispatch(toggleCartHidden())}
        />
      )}
    </>
  );
};

export default ProductPageContainer;
