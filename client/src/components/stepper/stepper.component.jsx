import React from "react";
import Icon from "../icon/icon.component";
import "./stepper.styles.scss";

const Stepper = ({ quantity, increment, decrement }) => (
  <div className="stepper-component">
    <div className="stepper-container">
      <button
        className="quantity-decrease"
        aria-label={`Increase quantity quantity by one. Currently ${quantity}`}
        disabled={quantity === 1}
        onClick={decrement}
      >
        <Icon icon="minus" />
      </button>
      <span className="quantity">{quantity}</span>
      <button
        className="quantity-increase"
        aria-label={`Decrease-quantity by one. Currently ${quantity}`}
        onClick={increment}
      >
        <Icon icon="plus" />
      </button>
    </div>
  </div>
);

export default Stepper;
