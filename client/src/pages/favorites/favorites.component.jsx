import React from "react";
import { useSelector } from "react-redux";
import { selectSortedFavorites } from "../../redux/shop/shop.selectors";

import CollectionPage from "../collection/collection.component";
import Spinner from "../../components/spinner/spinner.component";
import ErrorMessage from "../../components/error-message/error-message.component";
import FavoritesEmptyMessage from "./components/favorites-empty-message.component.jsx";

import "./favorites.styles.scss";

import {
  selectErrorMessage,
  selectIsUserFetching,
} from "../../redux/user/user.selectors";

const FavoritesPage = () => {
  const favorites = useSelector(selectSortedFavorites);
  const loading = useSelector(selectIsUserFetching);
  const error = useSelector(selectErrorMessage);

  if (loading && !error) {
    return <Spinner />;
  } else if (error) {
    return <ErrorMessage errorType='loading' />;
  } else if (!loading && favorites?.length > 0) {
    return <CollectionPage title='Favorites' collectionItems={favorites} />;
  } else {
    return <FavoritesEmptyMessage />;
  }
};
export default FavoritesPage;
