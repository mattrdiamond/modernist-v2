import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import WithSpinner from "../with-spinner/with-spinner.component";
import { selectIsUserFetching } from "../../redux/user/user.selectors";
import FavoritingButton from "./favoriting-button.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsUserFetching,
});

const FavoritingButtonContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(FavoritingButton);

export default FavoritingButtonContainer;
