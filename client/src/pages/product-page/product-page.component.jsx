import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectItem } from "../../redux/shop/shop.selectors";
import "./product-page.styles.scss";

const ProductPage = ({ item, collectionId }) => {
  const { name, price, imageUrl } = item;
  return (
    <div className="product-page">
      <div className="col-left">
        <img className="product-img" src={imageUrl} alt={name} />
      </div>
      <div className="col-right">
        <Link to={`/shop/${collectionId}`}>
          <span className="collection-name">{collectionId}</span>
        </Link>
        <h1>{name}</h1>
        <h2>${price}</h2>
        <p className="product-description">
          Lorem Ipsum eos volupta temposam eosa consequid maxim res derum id mos
          por ratem. Ficiis mil moloria nonsectatur sequuntori nistia aut aut
          lit harumque etumquu ntustia pe volores sin pratem quo ipsume
          nimoditatem eaquas et odignih ilibusdae audis esse laborio quiam eum
          voluptaet vel molupta pernat litatquam idunt molo quiaeptat earum, aut
          omnih.
        </p>
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

// export default connect(mapStateToProps)(ProductPage);
export default withRouter(connect(mapStateToProps)(ProductPage));
