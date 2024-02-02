import React from "react";
import { promoDataPropType } from "../../sharedPropTypes/sharedPropTypes";
import { useSelector } from "react-redux";

import {
  selectCartSubtotal,
  getTotalQuantity,
  getShipping,
  getTax,
  getTotal,
  selectCartItemsWithDiscounts,
  selectTotalDiscount,
} from "../../redux/cart/cart.selectors";
import { selectAppliedPromos } from "../../redux/promo/promo.selectors";

import PromoForm from "../../components/promo-form/promo-form.component";
import PromoBanner from "../../components/promo-banner/promo-banner.component";
import CheckoutSummary from "./components/checkout-summary/checkout-summary.component";
import EmptyBagMessage from "./components/empty-bag-message/empty-bag-message";
import CheckoutShoppingBag from "./components/checkout-shopping-bag/checkout-shopping-bag.component";

import "./checkout-page.styles.scss";

const CheckoutPage = ({ promoData }) => {
  const cartSubtotal = useSelector(selectCartSubtotal);
  const appliedPromos = useSelector(selectAppliedPromos);
  const totalQuantity = useSelector(getTotalQuantity);
  const shipping = useSelector(getShipping);
  const tax = useSelector(getTax);
  const total = useSelector(getTotal);
  const cartItemsWithDiscounts = useSelector(selectCartItemsWithDiscounts);
  const totalDiscount = useSelector(selectTotalDiscount);

  return (
    <div className='checkout-page-container'>
      {promoData && <PromoBanner promoData={promoData} />}
      {!cartItemsWithDiscounts.length ? (
        <EmptyBagMessage />
      ) : (
        <div className='checkout-background-screen'>
          <div className='checkout-page-content page-width'>
            <div className='checkout-flex-container'>
              <CheckoutShoppingBag
                totalQuantity={totalQuantity}
                cartItems={cartItemsWithDiscounts}
                appliedPromos={appliedPromos}
              />
              <div className='summary-column'>
                <CheckoutSummary
                  cartSubtotal={cartSubtotal}
                  appliedPromos={appliedPromos}
                  shipping={shipping}
                  tax={tax}
                  totalDiscount={totalDiscount}
                  total={total}
                />
                <PromoForm appliedPromos={appliedPromos} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

CheckoutPage.propTypes = {
  promoData: promoDataPropType,
};
