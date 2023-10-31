import React from "react";
import PropTypes from "prop-types";
import "./product-tag.styles.scss";

export default function ProductTag({ tags }) {
  const getHighestPriorityTag = (tags) => {
    if (!tags) return null;
    if (tags["top-rated"]) {
      return "top-rated";
    } else if (tags["bestseller"]) {
      return "bestseller";
    } else if (tags["new"]) {
      return "new";
    }
    return null;
  };

  return (
    <>
      <span className='product-tag'>{getHighestPriorityTag(tags)}</span>
    </>
  );
}

ProductTag.propTypes = {
  tags: PropTypes.shape({
    new: PropTypes.bool,
    bestseller: PropTypes.bool,
    "top-rated": PropTypes.bool,
  }),
};
