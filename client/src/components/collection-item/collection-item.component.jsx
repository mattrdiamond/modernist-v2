import React from "react";
import { Link } from "react-router-dom";
import FavoritingButton from "../favoriting-button/favoriting-button.component";
import ImageLoader from "../../components/image-loader/image-loader.component";
import "./collection-item.styles.scss";

const CollectionItem = ({ item }) => {
  const { name, price, collection, images } = item;

  return (
    <div className='collection-item'>
      <Link className='product-link' to={`/shop/${collection}/${item.id}`}>
        <ImageLoader src={images.small} alt={name} styles='image' withSpinner />
      </Link>
      <FavoritingButton item={item} />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>${price}</span>
      </div>
    </div>
  );
};

export default CollectionItem;
