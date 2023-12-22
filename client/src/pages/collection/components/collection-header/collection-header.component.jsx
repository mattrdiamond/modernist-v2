import React from "react";
import PropTypes from "prop-types";

import Breadcrumb from "../../../../components/breadcrumb/breadcrumb.component";
import ItemCount from "../../../../components/item-count/item-count.component";

import "./collection-header.styles.scss";

export default function CollectionHeader({ heading, itemCount }) {
  return (
    <div className='collection-header-wrapper page-width'>
      <Breadcrumb />
      <div className='heading-itemcount-container'>
        <h1 className='collection-heading'>{heading}</h1>
        <ItemCount count={itemCount} />
      </div>
    </div>
  );
}

CollectionHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  itemCount: PropTypes.number.isRequired,
};
