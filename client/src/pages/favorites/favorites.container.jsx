import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { selectIsUserFetching } from "../../redux/user/user.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import Favorites from "./favorites.component";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => selectIsUserFetching(state),
});

const FavoritesPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(Favorites);

export default FavoritesPageContainer;
