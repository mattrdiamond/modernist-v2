import React from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";
import CustomButton from "../custom-button/custom-button.component";
import FavoritingButton from "../favoriting-button/favoriting-button.component";
import { withRouter, Link } from "react-router-dom";
import "./collection-item.styles.scss";

const CollectionItem = ({ item, addItem, routeName, history, match }) => {
  const { name, price, imageUrl } = item;
  console.log("match", match);
  return (
    <div className="collection-item">
      <Link
        className="product-link"
        to={`${match.url}${routeName ? `/${routeName}` : ""}/${item.id}`}
      >
        <div
          className="image"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />
      </Link>
      <FavoritingButton item={item} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton inverted onClick={() => addItem(item)}>
        Add to cart
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default withRouter(connect(null, mapDispatchToProps)(CollectionItem));
