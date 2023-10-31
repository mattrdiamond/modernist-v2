import React from "react";
import { productType } from "../shared/sharedPropTypes";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Link, useParams, withRouter } from "react-router-dom";
import { selectProductById } from "../../redux/shop/shop.selectors";
import "./breadcrumb.styles.scss";

const Breadcrumb = ({ product }) => {
  const { collectionId, itemId } = useParams();

  return (
    <div className='breadcrumb-wrapper'>
      <ol>
        <li className='breadcrumb-list-item'>
          <Link to='/shop'>Shop</Link>
        </li>

        {collectionId && (
          <li className='breadcrumb-list-item'>
            <span className='breadcrumb-slash'>/</span>
            {product ? (
              <Link to={`/shop/${collectionId}`}>
                <span className='collection-id'>{collectionId}</span>
              </Link>
            ) : (
              <span>{collectionId}</span>
            )}
          </li>
        )}

        {itemId && product && (
          <li className='breadcrumb-list-item'>
            <span className='breadcrumb-slash'>/</span>
            <span>{product.name}</span>
          </li>
        )}
      </ol>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  product: (state, ownProps) =>
    selectProductById(ownProps.match.params.itemId)(state),
});

export default withRouter(connect(mapStateToProps, null)(Breadcrumb));

Breadcrumb.propTypes = {
  product: productType,
};
