import React from "react";
import PropTypes from "prop-types";
import { shippingThreshold } from "../../../utils/constants";
import Icon from "../../../components/icon/icon.component";
import "./checkout-free-shipping-progress.styles.scss";

export default function FreeShippingProgress({ subtotal }) {
  const progress = Math.min((subtotal / shippingThreshold) * 100, 100);
  const iconColor =
    subtotal >= shippingThreshold ? "var(--accent-100)" : "var(--primary-13";

  return (
    <div className='free-shipping-progress-wrapper'>
      <p className='shipping-progress-message'>
        {subtotal < shippingThreshold ? (
          <span>
            Add{" "}
            <span className='font-semibold'>
              {`$${(shippingThreshold - subtotal).toFixed(2)}`}
            </span>{" "}
            for <span className='font-semibold'>FREE Shipping!</span>
            <Icon icon='information' width='0.75rem' height='0.75rem' />
          </span>
        ) : (
          <span>
            You've unlocked{" "}
            <span className='font-semibold'>FREE Shipping!</span>
          </span>
        )}
      </p>
      <div className='progress-bar-container'>
        <div className='progress-bar'>
          <div
            className='progress-bar-fill'
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className='checkmark-container'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon-checkmark'
            viewBox='0 0 17 17'
            fill={iconColor}
          >
            <g fillRule='evenodd'>
              <circle cx='8.5' cy='8.5' r='8.5' />
              <path
                stroke='#FFF'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m4.8 9 2.1 2 5.5-5'
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

FreeShippingProgress.propTypes = {
  subtotal: PropTypes.number.isRequired,
};
