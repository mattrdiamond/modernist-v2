import React from "react";
import PropTypes from "prop-types";
import { categoryItemType } from "../../sharedPropTypes/sharedPropTypes";

import ImageGrid from "./image-grid/image-grid.component";
import CollectionItem from "../collection-item/collection-item.component";

export default function ProductGrid({ items }) {
  return (
    <div className='product-grid'>
      <ImageGrid className='page-width'>
        {items?.length > 0 &&
          items.map((item) => <CollectionItem key={item.id} item={item} />)}
      </ImageGrid>
    </div>
  );
}

ProductGrid.propTypes = {
  items: PropTypes.arrayOf(categoryItemType).isRequired,
};
