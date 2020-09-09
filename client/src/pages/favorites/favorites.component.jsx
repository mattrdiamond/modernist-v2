import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import { selectFavorites } from "../../redux/user/user.selectors";
import CustomButton from "../../components/custom-button/custom-button.component";
import ImageGrid from "../../components/image-grid/image-grid.component";
import "./favorites.styles.scss";

const FavoritesPage = ({ favorites }) => {
  let favoritesArray = favorites ? Object.values(favorites) : null;
  return (
    <div className="favorites-page page-width">
      {favorites ? (
        <>
          <div className="favorites-text">
            <h2 className="title">Favorites</h2>
            <span className="subtitle">
              All your top picks, together at last!
            </span>
          </div>
          <ImageGrid items={favoritesArray} />
        </>
      ) : (
        <div className="empty-fav-container">
          <h2>Your wishlist is empty.</h2>
          <Link to="/shop">
            <CustomButton>Shop Now</CustomButton>
          </Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  favorites: selectFavorites,
});

export default connect(mapStateToProps)(FavoritesPage);
