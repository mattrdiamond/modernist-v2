import React, { Component } from "react";
import { connect } from "react-redux";
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
    } else if (favorites && favorites[item.id]) {
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
        <svg className='heart' width='18' height='16' viewBox='0 0 18 16'>
          <path
            d='M16.6 1.4c-1.9-1.9-5-1.9-6.9 0-.3.3-.5.5-.7.8C7.5-.1 4.5-.7 2.2.8S-.7 5.4.8 7.6c.2.3.4.6.6.8L9 16l7.6-7.6c1.9-1.9 1.9-5 0-7z'
            fill='none'
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

export default connect(mapStateToProps, mapDispatchToProps)(FavoritingButton);
