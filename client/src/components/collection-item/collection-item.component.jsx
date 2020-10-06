import React from "react";
import { Link } from "react-router-dom";
import FavoritingButton from "../favoriting-button/favoriting-button.component";
import "./collection-item.styles.scss";

const CollectionItem = ({ item }) => {
  const { name, price, collection, images } = item;

  return (
    <div className="collection-item">
      <Link className="product-link" to={`/shop/${collection}/${item.id}`}>
        <img src={images.small} alt={name} className="image" />
      </Link>
      <FavoritingButton item={item} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
    </div>
  );
};

export default CollectionItem;
