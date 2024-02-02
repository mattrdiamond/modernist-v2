import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { reviewPropTypes } from "./reviews.propTypes";
import StarRating from "../star-rating/star-rating.component";
import { formatDateDifference } from "../../utils/formatDateDifference";
import "./review.styles.scss";

export default function Review({
  headline,
  reviewText,
  rating,
  name,
  createdAt,
  screenSize,
}) {
  const [isTruncated, setIsTruncated] = useState(false);
  const [showFullReview, setShowFullReview] = useState(false);
  const formattedDate = formatDateDifference(createdAt);
  const reviewTextRef = useRef(null);

  //Check if the review text exceeds the visible area (truncated by css properties) or fits within it.
  useEffect(() => {
    if (
      reviewTextRef.current.scrollHeight > reviewTextRef.current.clientHeight
    ) {
      setIsTruncated(true);
    } else {
      setIsTruncated(false);
    }
  }, [reviewText, screenSize]);

  const toggleReview = () => {
    setShowFullReview(!showFullReview);
  };

  return (
    <article className='review-item'>
      <StarRating rating={rating} maxRating={5} starSize='0.875rem' />
      <h5 className='review-headline'>{headline}</h5>
      <p
        className={`review-text grey-text${showFullReview ? "expanded" : ""}`}
        ref={reviewTextRef}
      >
        {reviewText}
      </p>
      {isTruncated && (
        <button className='read-more-button text-link' onClick={toggleReview}>
          {showFullReview ? "Read Less" : "Read More"}
        </button>
      )}
      <p className='reviewer'>
        <span className='reviewer-name'>{name}</span>
        <span className='created-at'>{formattedDate}</span>
      </p>
    </article>
  );
}

Review.propTypes = {
  ...reviewPropTypes,
  screenSize: PropTypes.string.isRequired,
};
