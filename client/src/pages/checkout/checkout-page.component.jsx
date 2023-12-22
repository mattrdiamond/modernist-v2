import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectCartSubtotal,
  getTotalQuantity,
  getShipping,
  getTax,
  getDiscount,
  getTotal,
} from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectPromoApplied } from "../../redux/promo/promo.selectors";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import PromoForm from "../../components/promo-form/promo-form.component";
import PromoBanner from "../../components/promo-banner/promo-banner.component";
import CheckoutSummary from "./components/checkout-summary.component";

import "./checkout-page.styles.scss";

const CheckoutPage = ({
  cartItems,
  cartSubtotal,
  promoApplied,
  totalQuantity,
  shipping,
  tax,
  discount,
  total,
}) => {
  return (
    <div className='checkout-page-container'>
      <PromoBanner promoCode='SUPERSALE' />
      <div className='checkout-page page-width'>
        {!cartItems.length ? (
          <div className='empty-cart-container'>
            <h2>Your shopping bag is empty</h2>
            <Link to='/shop'>
              <CustomButton>Shop Now</CustomButton>
            </Link>
          </div>
        ) : (
          <>
            <div className='checkout-wrapper'>
              {/*----------- cart ---------------*/}
              <div className='left-col'>
                <h1 className='checkout-title'>Shopping Bag</h1>
                <div className='cart'>
                  <div className='checkout-header-row'>
                    <div className='col-description header-block'>
                      <span>
                        {totalQuantity > 1
                          ? `${totalQuantity} Items`
                          : "1 Item"}
                      </span>
                    </div>
                    <div className='col-qty header-block'>
                      <span>Qty</span>
                    </div>
                    <div className='col-price header-block'>
                      <span>Price</span>
                    </div>
                    <div className='col-delete' />
                  </div>
                  {cartItems.map((cartItem) => (
                    <CheckoutItem
                      key={`${cartItem.id}-${JSON.stringify(
                        cartItem.selectedOptions
                      )}`}
                      cartItem={cartItem}
                    />
                  ))}
                </div>
              </div>
              <div className='right-col'>
                {/*----------- summary ---------------*/}
                <CheckoutSummary
                  cartSubtotal={cartSubtotal}
                  promoApplied={promoApplied}
                  shipping={shipping}
                  tax={tax}
                  discount={discount}
                  total={total}
                />
                {/*----------- promo ---------------*/}
                <PromoForm />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartSubtotal: selectCartSubtotal,
  currentUser: selectCurrentUser,
  promoApplied: selectPromoApplied,
  totalQuantity: getTotalQuantity,
  shipping: getShipping,
  tax: getTax,
  discount: getDiscount,
  total: getTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
