import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectFavorites,
} from "../../redux/user/user.selectors";
import {
  addFavoriteStart,
  removeFavoriteStart,
} from "../../redux/user/user.actions";
import { openModal } from "../../redux/modal/modal.actions";
import "./favoriting-button.styles.scss";

class FavoritingButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
    };
  }

  handleClick = () => {
    const { currentUser, item, favorites, openModal } = this.props;

    if (!currentUser) {
      openModal("SignInToAddFav");
    } else if (favorites[item.id]) {
      this.handleRemoveFavorite();
    } else {
      this.handleAddFavorite();
    }
  };

  handleAddFavorite = async () => {
    const { currentUser, item, favorites, addFavoriteStart } = this.props;
    // update db
    await addFavoriteStart({ currentUser, item, favorites });
    // update local state
    this.setState({ isfavorite: true });
  };

  handleRemoveFavorite = async () => {
    const { currentUser, item, favorites, removeFavoriteStart } = this.props;
    await removeFavoriteStart({ currentUser, item, favorites });
    this.setState({ isFavorite: false });
  };

  // prevent rendering all favoriting buttons when single element favorited
  shouldComponentUpdate(nextProps) {
    const { item } = this.props;
    // only render if no favorites (prior to sign in) or if a new favorite has been added
    return (
      !this.props.favorites ||
      !nextProps.favorites ||
      nextProps.favorites[item.id] !== this.props.favorites[item.id]
    );
  }

  render() {
    const { item, favorites } = this.props;

    return (
      <div
        className={`favorite-button ${
          favorites && favorites[item.id] ? "favorite" : ""
        }`}
        onClick={this.handleClick}
      >
        <svg className="heart" width="20" height="18" viewBox="0 0 20 18">
          <path
            d="M17.491 2.794a4.77 4.77 0 0 0-7.347.737A4.77 4.77 0 1 0 2.796 9.54l7.347 7.349L17.49 9.54a4.77 4.77 0 0 0 0-6.746z"
            fill="none"
          ></path>
        </svg>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  favorites: selectFavorites,
});

const mapDispatchToProps = (dispatch) => ({
  addFavoriteStart: (currentUser, item, favorites) =>
    dispatch(addFavoriteStart(currentUser, item, favorites)),
  removeFavoriteStart: (currentUser, item, favorites) =>
    dispatch(removeFavoriteStart(currentUser, item, favorites)),
  openModal: (modalType, modalProps) =>
    dispatch(openModal(modalType, modalProps)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FavoritingButton)
);
