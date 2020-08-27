import React from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";
import CustomButton from "../custom-button/custom-button.component";
import FavoritingButton from "../favoriting-button/favoriting-button.component";
import { withRouter, Link } from "react-router-dom";
import "./collection-item.styles.scss";

const CollectionItem = ({ item, addItem, routeName, history, match }) => {
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

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default withRouter(connect(null, mapDispatchToProps)(CollectionItem));
