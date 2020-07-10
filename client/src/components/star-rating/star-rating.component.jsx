import React from "react";
import Icon from "../icon/icon.component";
import "./star-rating.styles.scss";

const StarRating = () => {
  const rating = 4;
  const reviewCount = 5;
  const starArray = [...Array(5).keys()]; // [0, 1, 2, 3, 4]

  return (
    <div className="star-rating">
      <ul className="rating-list">
        {starArray.map((star, index) => (
          <li key={index} className={"star" + (star < rating ? " shaded" : "")}>
            <Icon icon="star" />
          </li>
        ))}
      </ul>
      <span className="review-count">{reviewCount} reviews</span>
    </div>
  );
};

export default StarRating;
