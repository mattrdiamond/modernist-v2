import React from "react";
import PropTypes from "prop-types";
import { productTagPropType } from "../../sharedPropTypes/sharedPropTypes";
import "./product-tag.styles.scss";

export default function ProductTag({ tags, tagStyle = "default" }) {
  const getHighestPriorityTag = (tags) => {
    if (!tags) return null;
    if (tags["top-rated"]) {
      return "top-rated";
    } else if (tags["bestseller"]) {
      return "bestseller";
    } else if (tags["new"]) {
      return "new arrival";
    }
    return null;
  };

  const tagStyles = {
    default: "product-detail-tag",
    "collection-item": "collection-item-tag",
  };

  return (
    <div className='product-tag'>
      <span className={tagStyles[tagStyle] || tagStyles["default"]}>
        {getHighestPriorityTag(tags)}
      </span>
    </div>
  );
}

ProductTag.propTypes = {
  tags: productTagPropType,
  tagStyle: PropTypes.string,
};
