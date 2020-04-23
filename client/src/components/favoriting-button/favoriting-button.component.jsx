import React, { useState } from "react";
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

  const handleClick = () => {
    if (!currentUser) {
      modalRef.current.openModal();
    } else if (favorites[item.id]) {
      console.log("remove favorite");
    } else {
      addFavoriteStart({ currentUser, item, favorites });
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

  const modalRef = React.useRef();

  return (
    <React.Fragment>
      <div
        className={`${isFavorite ? "favorite" : "not-favorite"}`}
        onClick={handleClick}
      >
        FAV
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
