import React, { useState } from "react";
import { reviewsPropTypes } from "./reviews.propTypes";
import Review from "./review.component";
import StarRating from "../star-rating/star-rating.component";
import Icon from "../icon/icon.component";
import CustomButton from "../custom-button/custom-button.component";
import { useWindowSize } from "../../contexts/WindowSizeContext";
import "./reviews.styles.scss";

export default function Reviews({ productReviews, rating }) {
  const [visibleReviews, setVisibleReviews] = useState(5);
  const { width } = useWindowSize();

  return (
    <section className='reviews-section'>
      {productReviews.length ? (
        <>
          <div className='reviews-overview'>
            <div className='total-reviews'>
              <span className='rating'>{rating.toFixed(1)}</span>
              <StarRating rating={rating} starSize='1.125rem' />
              <span className='review-count'>
                {productReviews.length} Reviews
              </span>
            </div>
            <p className='verified-statement'>
              <Icon icon='verified' title='verified' />
              All reviews are verified for authenticity.
              <span className='text-link'>Learn More</span>
            </p>
          </div>
          <div className='reviews-container'>
            {productReviews
              .slice(0, visibleReviews)
              .map(({ reviewId, ...props }) => (
                <Review key={reviewId} screenSize={width} {...props} />
              ))}
            {visibleReviews < productReviews.length && (
              <CustomButton
                buttonStyle='inverted'
                onClick={() =>
                  setVisibleReviews(
                    (prevVisibleReviews) => prevVisibleReviews + 5
                  )
                }
              >
                Show More Reviews
              </CustomButton>
            )}
          </div>
        </>
      ) : (
        <p>No reviews available for this product.</p>
      )}
    </section>
  );
}

Reviews.propTypes = {
  ...reviewsPropTypes,
};
