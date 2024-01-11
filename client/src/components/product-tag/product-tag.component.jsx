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
    default: "product-tag",
    "collection-item": "collection-item-tag",
  };

  return (
    <>
      <span className={tagStyles[tagStyle] || tagStyles["default"]}>
        {getHighestPriorityTag(tags)}
      </span>
    </>
  );
}

ProductTag.propTypes = {
  tags: productTagPropType,
  tagStyle: PropTypes.string,
};
