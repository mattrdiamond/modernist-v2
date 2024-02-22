import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { productDetailType } from "../../sharedPropTypes/sharedPropTypes";
import { baseImgUrl } from "../../utils/constants";
import Stepper from "../../components/stepper/stepper.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import ImageReloader from "../../components/image-loader/image-reloader.component";
import FavoritingButton from "../../components/favoriting-button/favoriting-button.component";
import ProductPageTopContent from "./components/product-page-title-section.component";
import ProductPageAccordions from "./components/product-page-accordions.component";
import ProductPageOptions from "./components/product-page-options.component";
import Breadcrumb from "../../components/breadcrumb/breadcrumb.component";

import "./product-page.styles.scss";

export default function ProductPage({
  product,
  addItemToCart,
  toggleCartHidden,
  productReviews,
}) {
  const { name, images, rating, review_count, price, options, description } =
    product;

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [priceWithOptions, setPriceWithOptions] = useState(price);

  const handleAddItem = () => {
    setQuantity(quantity + 1);
  };

  const handleRemoveItem = () => {
    setQuantity(quantity - 1);
  };

  const addToCart = () => {
    const itemWithOptions = {
      ...product,
      selectedOptions,
      quantity,
      price: priceWithOptions,
    };
    addItemToCart(itemWithOptions, quantity);
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
      setPriceWithOptions(newTotalPrice);
      return newOptions;
    });
  };

  useEffect(() => {
    const selectFirstOptionByDefault = () => {
      if (options && options.length > 0) {
        const initialSelectedOptions = {};
        let basePrice = price;

        options.forEach((category) => {
          if (category.choices && category.choices.length > 0) {
            const defaultOption = category.choices[0];

            // Use the default option's priceModifier if available
            const priceModifier = defaultOption.priceModifier || 0;

            // Set the initial selected option with the adjusted priceModifier
            initialSelectedOptions[category.name] = {
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
    };

    selectFirstOptionByDefault();
  }, [options, price]);

  return (
    <div className='product-page page-width'>
      <Breadcrumb />
      <div className='product-details-container'>
        <div className='col-left'>
          <div className='sticky-container'>
            <div className='img-wrapper'>
              <ImageReloader
                src={baseImgUrl + images.large}
                alt={name}
                styles='product-img'
                withSpinner
              />
              <FavoritingButton item={product} />
            </div>
          </div>
        </div>
        <div className='col-right'>
          <ProductPageTopContent
            product={product}
            priceWithOptions={priceWithOptions}
          />
          {options && options.length > 0 && (
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
            description={description}
            productReviews={productReviews}
            rating={rating}
            reviewCount={review_count}
          />
        </div>
      </div>
    </div>
  );
}

ProductPage.propTypes = {
  product: productDetailType.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  toggleCartHidden: PropTypes.func.isRequired,
  productReviews: PropTypes.array,
};
