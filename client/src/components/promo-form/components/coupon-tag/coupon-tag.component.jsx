import React from "react";
import { useDispatch } from "react-redux";
import { removePromo } from "../../../../redux/promo/promo.actions";
import Icon from "../../../icon/icon.component";
import "./coupon-tag.styles.scss";

export default function CouponTag({ promoCode }) {
  const dispatch = useDispatch();

  return (
    <div className='coupon-tag'>
      <Icon icon='promo' width='0.875rem' height='0.875rem' />
      <span>{promoCode}</span>
      <button
        onClick={() => dispatch(removePromo(promoCode))}
        className='remove-coupon'
      >
        <Icon icon='close' title='remove' width='0.675rem' height='0.675rem' />
      </button>
    </div>
  );
}
