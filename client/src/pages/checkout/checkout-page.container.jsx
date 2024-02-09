import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsCheckoutLoading } from "../../redux/checkout/checkout.selectors";
import { selectCartFetching } from "../../redux/cart/cart.selectors";
import {
  selectPromoDataLoading,
  selectPromoData,
} from "../../redux/promo/promo.selectors";
import { fetchPromosStart } from "../../redux/promo/promo.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CheckoutPage from "./checkout-page.component";

const CheckoutPageWithSpinner = WithSpinner(CheckoutPage);

const CheckoutPageContainer = () => {
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) =>
      selectIsCheckoutLoading(state) ||
      selectCartFetching(state) ||
      selectPromoDataLoading(state)
  );
  const promoData = useSelector(selectPromoData);

  useEffect(() => {
    // Fetch promos when the component mounts
    if (!Object.keys(promoData).length > 0) {
      dispatch(fetchPromosStart());
    }
  }, [dispatch, promoData]);

  return <CheckoutPageWithSpinner isLoading={loading} promoData={promoData} />;
};

export default CheckoutPageContainer;
