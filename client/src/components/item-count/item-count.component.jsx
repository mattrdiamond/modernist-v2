import React from "react";
import "./item-count.styles.scss";

export default function ItemCount({ count = 0 }) {
  return (
    <span className='item-count grey-text'>{`${count} Item${
      count !== 1 ? "s" : ""
    }`}</span>
  );
}
