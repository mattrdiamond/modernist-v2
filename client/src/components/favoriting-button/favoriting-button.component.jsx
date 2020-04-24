import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addFavoriteStart,
  addFavoriteSuccess,
} from "../../redux/user/user.actions";
import Modal from "../../components/modal/modal.component";
import CustomButton from "../custom-button/custom-button.component";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectFavorites,
} from "../../redux/user/user.selectors";
import "./favoriting-button.styles.scss";

const FavoritingButton = ({
  item,
  currentUser,
  favorites,
  addFavoriteStart,
  history,
}) => {
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    if (favorites[item.id]) {
      setFavorite({ isFavorite: true });
    }
  }, [setFavorite]);

  const handleClick = () => {
    if (!currentUser) {
      modalRef.current.openModal();
    } else if (favorites[item.id]) {
      console.log("remove favorite");
    } else {
      // addFavoriteStart({ currentUser, item, favorites });
      handleAddFavorite();
    }
    // else if (
    //   favorites.filter((favorite) => favorite.id === item.id).length < 1
    // ) {
    //   // console.log("Add favorite!", favorites, item);
    //   addFavoriteStart({ currentUser, item });
    // } else {
    //   console.log("remove favorite", favorites);
    // }
  };

  const handleAddFavorite = async () => {
    await addFavoriteStart({ currentUser, item, favorites });
    setFavorite({ isfavorite: true });
  };

  const modalRef = React.useRef();

  return (
    <React.Fragment>
      <div
        className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
        onClick={handleClick}
      >
        <svg className="heart" width="20" height="18" viewBox="0 0 20 18">
          <path
            d="M17.491 2.794a4.77 4.77 0 0 0-7.347.737A4.77 4.77 0 1 0 2.796 9.54l7.347 7.349L17.49 9.54a4.77 4.77 0 0 0 0-6.746z"
            fill="none"
          ></path>
        </svg>
      </div>
      <Modal ref={modalRef}>
        <h1>Save this product</h1>
        <p>Login or register to save your Favorites.</p>
        <CustomButton
          onClick={() => {
            history.push("/signin");
          }}
        >
          Sign In
        </CustomButton>
        <button onClick={() => modalRef.current.close()}>Cancel</button>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  favorites: selectFavorites,
});

const mapDispatchToProps = (dispatch) => ({
  addFavoriteStart: (currentUser, item, favorites) =>
    dispatch(addFavoriteStart(currentUser, item, favorites)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FavoritingButton)
);
