import React from "react";
import { Link } from "react-router-dom";
import { baseImgUrl } from "../../utils/constants";
import FavoritingButton from "../favoriting-button/favoriting-button.component";
import ImageLoader from "../../components/image-loader/image-loader.component";
import ProductTag from "../product-tag/product-tag.component";
import "./collection-item.styles.scss";

const CollectionItem = ({ item }) => {
  const { name, price, collection, images, tags, hasOptions } = item;

  return (
    <div className='collection-item'>
      <Link className='product-link' to={`/shop/${collection}/${item.id}`}>
        <ImageLoader
          src={baseImgUrl + images.small}
          alt={name}
          styles='image'
        />
      </Link>
      <FavoritingButton item={item} />
      <div className='collection-item-footer'>
        <div className='collection-item-footer__col-1'>
          {tags && Object.keys(tags).length > 0 && (
            <ProductTag tags={tags} tagStyle='collection-item' />
          )}
          <Link to={`/shop/${collection}/${item.id}`}>
            <span className='collection-item-name'>{name}</span>
          </Link>
          <span className='collection-item-price'>${price.toFixed(2)}</span>
        </div>
        {hasOptions && (
          <Link to={`/shop/${collection}/${item.id}`}>
            <span className='collection-item-more-options'>+ More Options</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CollectionItem;
