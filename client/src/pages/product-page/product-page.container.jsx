import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import ProductPage from "./product-page.component";

// Have to invert state - if selectIsCollectionsLoaded is false, isLoading should be true
const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCollectionsLoaded(state),
});

const ProductPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(ProductPage);

export default ProductPageContainer;
