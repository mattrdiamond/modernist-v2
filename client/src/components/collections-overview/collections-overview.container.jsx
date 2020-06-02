import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";

// Container pattern - component gets wrapped in multiple layers of wrapped components (HOCs)
// Containers don't render anything. They just pass props from store down to components.

// We can use redux compose to make nested HOCs more readable - evaluates from right to left:
// 1. withSpinner wraps around collections overview, resulting in a higher order component
// 2. Then pass HOC into connect which gives it the isLoading prop from mapStateToProps

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
