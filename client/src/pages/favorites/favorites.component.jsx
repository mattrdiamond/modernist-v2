import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import { selectFavorites } from "../../redux/user/user.selectors";
import CustomButton from "../../components/custom-button/custom-button.component";
import CollectionPage from "../collection/collection.component";
import "./favorites.styles.scss";

const FavoritesPage = ({ favorites }) => {
  let favoritesArray = favorites ? Object.values(favorites) : null;

  return (
    <>
      {favorites ? (
        <CollectionPage title='Favorites' collectionItems={favoritesArray} />
      ) : (
        <div className='empty-fav-container'>
          <h2>Your wishlist is empty.</h2>
          <Link to='/shop'>
            <CustomButton>Shop Now</CustomButton>
          </Link>
        </div>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  favorites: selectFavorites,
});

export default connect(mapStateToProps)(FavoritesPage);
