import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectProductReviews } from "../../redux/reviews/reviews.selectors";
import { selectItem } from "../../redux/shop/shop.selectors";
import { addItem, toggleCartHidden } from "../../redux/cart/cart.actions";
import { fetchReviewsStart } from "../../redux/reviews/reviews.actions";
import Stepper from "../../components/stepper/stepper.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import ImageReloader from "../../components/image-loader/image-reloader.component";
import FavoritingButton from "../../components/favoriting-button/favoriting-button.component";
import ProductPageTopContent from "./product-page-top-content.component";
import ProductPageAccordions from "./product-page-accordions.component";
import "./product-page.styles.scss";

const ProductPage = ({
  item,
  addItem,
  toggleCartHidden,
  collectionId,
  fetchReviewsStart,
  productReviews,
}) => {
  const { name, images, rating, review_count, sku, id } = item;
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!productReviews.length) {
      fetchReviewsStart(id);
    }
  }, [fetchReviewsStart, id, productReviews.length]);

  const handleAddItem = () => {
    setQuantity(quantity + 1);
  };

  const handleRemoveItem = () => {
    setQuantity(quantity - 1);
  };

  const addToCart = () => {
    addItem(item, quantity);
    toggleCartHidden();
  };

  return (
    <div className='product-page page-width'>
      <div className='col-left'>
        <ImageReloader
          src={images.large}
          alt={name}
          styles='product-img'
          withSpinner
        />
        <FavoritingButton item={item} />
      </div>
      <div className='col-right'>
        <ProductPageTopContent item={item} collectionId={collectionId} />
        <p>INSERT SELECT ITEMS</p>
        <div className='button-container'>
          <Stepper
            quantity={quantity}
            increment={handleAddItem}
            decrement={handleRemoveItem}
          />
          <CustomButton onClick={addToCart}>Add to Bag</CustomButton>
        </div>
        <ProductPageAccordions
          productReviews={productReviews}
          rating={rating}
          reviewCount={review_count}
        />

        <span className='product-detail'>
          <span className='font-bold'>Availability: </span>
          In stock
        </span>
        <span className='product-detail'>
          <span className='font-bold'>SKU: </span>
          {sku}
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  item: selectItem,
  collectionId: (state, ownProps) => ownProps.match.params.collectionId,
  productReviews: (state, ownProps) =>
    selectProductReviews(ownProps.match.params.itemId)(state),
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item, quantity) => dispatch(addItem(item, quantity)),
  toggleCartHidden: () => dispatch(toggleCartHidden()),
  fetchReviewsStart: (productId) => dispatch(fetchReviewsStart(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
