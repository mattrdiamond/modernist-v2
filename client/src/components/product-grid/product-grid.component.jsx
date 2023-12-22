import React from "react";
import PropTypes from "prop-types";
import { categoryItemType } from "../../sharedPropTypes/sharedPropTypes";

import ImageGrid from "./image-grid/image-grid.component";
import CollectionItem from "../collection-item/collection-item.component";
import SortResultsHeader from "../breadcrumb-sort-header/breadcrumb-sort-header.component";
import "./product-grid.styles.scss";

export default function ProductGrid({ items, showSortHeader }) {
  return (
    <div className='product-grid'>
      {showSortHeader && <SortResultsHeader resultsCount={items.length} />}
      <ImageGrid className='page-width'>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </ImageGrid>
    </div>
  );
}

ProductGrid.propTypes = {
  items: PropTypes.arrayOf(categoryItemType).isRequired,
  showSortHeader: PropTypes.bool,
};
