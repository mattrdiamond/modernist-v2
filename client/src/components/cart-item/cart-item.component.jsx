import React from "react";
import { baseImgUrl } from "../../utils/constants";
import { connect } from "react-redux";
import { clearItemFromCart } from "../../redux/cart/cart.actions";
import { Link } from "react-router-dom";
import ImageLoader from "../image-loader/image-loader.component";
import "./cart-item.styles.scss";

const CartItem = ({ item, clearItem, toggleCartHidden }) => {
  const { images, price, name, quantity, collection, id, selectedOptions } =
    item;

  const hasSelectedOptions =
    selectedOptions && Object.keys(selectedOptions).length > 0;

  return (
    <div className='cart-item'>
      <Link
        to={`/shop/${collection}/${id}`}
        onClick={toggleCartHidden}
        className='ignore-co-cart'
      >
        <ImageLoader
          src={baseImgUrl + images.small}
          alt={name}
          styles='cart-item-img'
        />
      </Link>
      <div className='item-content-grid'>
        <Link
          to={`/shop/${collection}/${id}`}
          onClick={toggleCartHidden}
          className='ignore-co-cart'
        >
          <span className='item-name font-bold line-clamp-2'>{name}</span>
        </Link>
        <span className='item-price font-bold'>{`$${price}`}</span>
        <div className='item-detail-container'>
          {hasSelectedOptions ? (
            Object.entries(selectedOptions).map(([category, option], index) => (
              <p key={index} className='item-detail selected-options'>
                <span className='option-category'>{`${category}: `}</span>
                <span className='option-value'>{option.value}</span>
              </p>
            ))
          ) : (
            <p className='item-detail'>
              <span className='option-category'>Size: </span>
              <span className='option-value'>One Size</span>
            </p>
          )}
          <p className='item-detail'>{`Qty: ${quantity}`}</p>
        </div>
        <button
          className='text-link remove-button'
          onClick={() => clearItem(item)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
});

export default connect(null, mapDispatchToProps)(CartItem);
