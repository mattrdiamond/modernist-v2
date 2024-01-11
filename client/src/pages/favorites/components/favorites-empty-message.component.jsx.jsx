import React from "react";
import { Link } from "react-router-dom";

import CustomButton from "../../../components/custom-button/custom-button.component";

import "./favorites-empty-message.styles.scss";

export default function FavoritesEmptyMessage() {
  return (
    <div className='favorites-empty-message'>
      <h2>Your wishlist is empty.</h2>
      <Link to='/shop'>
        <CustomButton>Shop Now</CustomButton>
      </Link>
    </div>
  );
}
