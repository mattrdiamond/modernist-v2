import React from "react";
import { Link } from "react-router-dom";

import CustomButton from "../../../../components/custom-button/custom-button.component";
import "./empty-bag-message.styles.scss";

export default function CheckoutEmptyBag() {
  return (
    <div className='empty-cart-container page-width'>
      <h2>Your shopping bag is empty.</h2>
      <Link to='/shop'>
        <CustomButton>Shop Now</CustomButton>
      </Link>
    </div>
  );
}
