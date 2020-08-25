import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { addItem } from "../../redux/cart/cart.actions";
import { selectItem } from "../../redux/shop/shop.selectors";
import StarRating from "../../components/star-rating/star-rating.component";
import Stepper from "../../components/stepper/stepper.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import FavoritingButton from "../../components/favoriting-button/favoriting-button.component";
import "./product-page.styles.scss";

const ProductPage = ({ item, collectionId, addItem }) => {
  const { name, price, imageUrl } = item;
  const [quantity, setQuantity] = useState(1);

  const handleAddItem = () => {
    setQuantity(quantity + 1);
  };

  const handleRemoveItem = () => {
    setQuantity(quantity - 1);
  };

  const addToCart = () => {
    addItem(item, quantity);
  };

  return (
    <div className="product-page page-width">
      <div className="col-left">
        <img className="product-img" src={imageUrl} alt={name} />
        <FavoritingButton item={item} />
      </div>
      <div className="col-right">
        <Link to={`/shop/${collectionId}`}>
          <span className="collection-name">{collectionId}</span>
        </Link>
        <h1 className="product-title">{name}</h1>
        <StarRating />
        <h2 className="product-price">${price}</h2>
        <h4>Product Description</h4>
        <p className="product-description">
          Lorem Ipsum eos volupta temposam eosa consequid maxim res derum id mos
          por ratem. Ficiis mil moloria nonsectatur sequuntori nistia aut aut
          lit harumque etumquu ntustia pe volores sin pratem quo ipsume
          nimoditatem eaquas et odignih ilibusdae audis esse laborio quiam eum
          voluptaet vel molupta pernat litatquam idunt molo quiaeptat earum, aut
          omnih.
        </p>
        <span className="product-detail">
          <span className="bold">Availability: </span>
          In stock
        </span>
        <span className="product-detail">
          <span className="bold">SKU: </span>
          {Math.floor(100000000 + Math.random() * 900000000)}
        </span>
        <div className="button-container">
          <Stepper
            quantity={quantity}
            increment={handleAddItem}
            decrement={handleRemoveItem}
          />
          <CustomButton onClick={addToCart}>Add to Bag</CustomButton>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { collectionId, itemId } = ownProps.match.params;
  return {
    item: selectItem(collectionId, itemId)(state),
    collectionId: collectionId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item, quantity) => dispatch(addItem(item, quantity)),
});

// export default connect(mapStateToProps)(ProductPage);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductPage)
);
