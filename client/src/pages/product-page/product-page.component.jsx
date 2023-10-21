import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectProductReviews } from "../../redux/reviews/reviews.selectors";
import { selectItem } from "../../redux/shop/shop.selectors";
import {
  addItemWithOptions,
  toggleCartHidden,
} from "../../redux/cart/cart.actions";
import { fetchReviewsStart } from "../../redux/reviews/reviews.actions";
import Stepper from "../../components/stepper/stepper.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import ImageReloader from "../../components/image-loader/image-reloader.component";
import FavoritingButton from "../../components/favoriting-button/favoriting-button.component";
import ProductPageTopContent from "./product-page-top-content.component";
import ProductPageAccordions from "./product-page-accordions.component";
import ProductPageOptions from "./product-page-options.component";
import { newProductData } from "../../utils/newProductData";

import "./product-page.styles.scss";

const ProductPage = ({
  item,
  addItemWithOptions,
  toggleCartHidden,
  collectionId,
  fetchReviewsStart,
  productReviews,
}) => {
  const { name, images, rating, review_count, price, id } = item;
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [priceWithOptions, setPriceWithOptions] = useState(price);

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
    const itemWithOptions = {
      ...item,
      selectedOptions,
      quantity,
      price: priceWithOptions,
    };
    addItemWithOptions(itemWithOptions);
    toggleCartHidden();
  };

  const calculatePriceWithOptions = (productPrice, selectedOptions) => {
    // Start with the base product price
    let totalPrice = productPrice;

    // Loop through the selected options and apply price modifiers
    for (const category in selectedOptions) {
      const selectedOption = selectedOptions[category];
      if (selectedOption.priceModifier) {
        totalPrice += selectedOption.priceModifier;
      }
    }
    return totalPrice;
  };

  const selectOption = (category, option) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newOptions = { ...prevSelectedOptions, [category]: option };
      const newTotalPrice = calculatePriceWithOptions(price, newOptions);
      // update displayed total price
      setPriceWithOptions(newTotalPrice);
      // return the updated options to set the state
      return newOptions;
    });
  };

  // temp - replace with actual product data
  const { options } = newProductData[1];

  // Use the first option from each category by default
  useEffect(() => {
    if (options && Object.keys(options).length > 0) {
      const initialSelectedOptions = {};
      let basePrice = price;

      Object.keys(options).forEach((category) => {
        if (options[category] && options[category].length > 0) {
          const defaultOption = options[category][0];

          // Use the default option's priceModifier if available
          const priceModifier = defaultOption.priceModifier || 0;

          // Set the initial selected option with the adjusted priceModifier
          initialSelectedOptions[category] = {
            ...defaultOption,
            priceModifier,
          };

          // Add the priceModifier to the basePrice
          basePrice += priceModifier;
        }
      });
      setSelectedOptions(initialSelectedOptions);
      setPriceWithOptions(basePrice);
    }
  }, [options]);

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
        <ProductPageTopContent
          item={item}
          collectionId={collectionId}
          priceWithOptions={priceWithOptions}
        />
        {options && Object.keys(options).length > 0 && (
          <ProductPageOptions
            options={options}
            selectedOptions={selectedOptions}
            selectOption={selectOption}
          />
        )}

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
  addItemWithOptions: (itemWithOptions) =>
    dispatch(addItemWithOptions(itemWithOptions)),
  toggleCartHidden: () => dispatch(toggleCartHidden()),
  fetchReviewsStart: (productId) => dispatch(fetchReviewsStart(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
