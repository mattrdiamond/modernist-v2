import React from "react";
import { connect } from "react-redux";
import { clearItemFromCart } from "../../redux/cart/cart.actions";
import Icon from "../icon/icon.component";
import { Link } from "react-router-dom";
import "./cart-item.styles.scss";

const CartItem = ({ item, clearItem, toggleCartHidden }) => {
  const { images, price, name, quantity, collection, id } = item;

  return (
    <div className='cart-item'>
      <Link
        to={`/shop/${collection}/${id}`}
        onClick={toggleCartHidden}
        className='ignore-co-cart'
      >
        <img src={images.small} alt={name} />
      </Link>
      <div className='item-info'>
        <div className='text-column'>
          <Link
            to={`/shop/${collection}/${id}`}
            onClick={toggleCartHidden}
            className='ignore-co-cart'
          >
            <span className='item-name font-bold line-clamp-2'>{name}</span>
          </Link>
          <span className='item-detail'>Price: ${price.toFixed(2)}</span>
          <span className='item-detail'>Quantity: {quantity}</span>
        </div>
        <button
          className='delete-button ignore-co-cart'
          onClick={() => clearItem(item)}
          aria-label='remove item from cart'
        >
          <Icon icon='remove' />
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
});

export default connect(null, mapDispatchToProps)(CartItem);
