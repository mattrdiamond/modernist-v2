import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { selectIsCheckoutLoading } from "../../redux/checkout/checkout.selectors";
import { selectCartFetching } from "../../redux/cart/cart.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CheckoutPage from "./checkout-page.component";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) =>
    selectIsCheckoutLoading(state) || selectCartFetching(state),
});

const CheckoutPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CheckoutPage);

export default CheckoutPageContainer;
