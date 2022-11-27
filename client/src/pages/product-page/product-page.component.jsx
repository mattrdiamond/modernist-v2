import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addItem, toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectItem } from "../../redux/shop/shop.selectors";
import StarRating from "../../components/star-rating/star-rating.component";
import Stepper from "../../components/stepper/stepper.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import ImageReloader from "../../components/image-loader/image-reloader.component";
import FavoritingButton from "../../components/favoriting-button/favoriting-button.component";
import "./product-page.styles.scss";

const ProductPage = ({ item, addItem, toggleCartHidden, collectionId }) => {
  const { name, price, images, rating, review_count, sku } = item;
  const [quantity, setQuantity] = useState(1);

  const handleAddItem = () => {
    setQuantity(quantity + 1);
  };

  const handleRemoveItem = () => {
    setQuantity(quantity - 1);
  };

  const addToCart = () => {
    addItem(item, quantity);
    toggleCartHidden();
  };

  return (
    <div className='product-page page-width'>
      <div className='col-left'>
        <ImageReloader
          src={images.large}
          alt={name}
          styles='product-img'
          withSpinner
        />
        <FavoritingButton item={item} />
      </div>
      <div className='col-right'>
        <Link to={`/shop/${collectionId}`}>
          <span className='collection-name'>{collectionId}</span>
        </Link>
        <h1 className='product-title'>{name}</h1>
        <StarRating rating={rating} maxRating={5} reviewCount={review_count} />
        <h2 className='product-price'>${price}</h2>
        <h4>Product Description</h4>
        <p className='product-description'>
          Lorem Ipsum dolor volupta temposam eosa consequid maxim res derum id
          mos por ratem. Ficiis mil moloria nonsectatur sequuntori nistia aut
          aut lit harumque etumquu ntustia pe volores sin pratem quo ipsume
          nimoditatem eaquas et odignih ilibusdae audis esse laborio quiam eum
          voluptaet vel molupta pernat litatquam idunt molo quiaeptat earum, aut
          omnih.
        </p>
        <span className='product-detail'>
          <span className='bold'>Availability: </span>
          In stock
        </span>
        <span className='product-detail'>
          <span className='bold'>SKU: </span>
          {sku}
        </span>
        <div className='button-container'>
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

const mapStateToProps = (state, ownProps) => ({
  item: selectItem(state, ownProps),
  collectionId: ownProps.match.params.collectionId,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item, quantity) => dispatch(addItem(item, quantity)),
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
