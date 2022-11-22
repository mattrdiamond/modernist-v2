import React from "react";
import Icon from "../icon/icon.component";
import ImageLoader from "../image-loader/image-loader.component";
import "./carousel-card.styles.scss";

const CarouselCard = ({ index, image, carouselState }) => (
  <div
    className={
      "card" +
      (index < carouselState.index ||
      index > carouselState.index + (carouselState.visibleImages - 1)
        ? " offscreen"
        : "")
    }
  >
    <a href={image.urls.regular} target='_blank' rel='noopener noreferrer'>
      <ImageLoader
        src={image.urls.small}
        alt={image.alt_description}
        styles='card-photo'
        withSpinner
      />
      <div className='card-footer'>
        <div className='user-details-container'>
          <img
            className='user-pic'
            src={image.user.profile_image.small}
            srcSet={`${image.user.profile_image.small} 1x, ${image.user.profile_image.medium} 2x`}
            alt={image.user.name}
          />
          <div className='user-details'>
            <span className='user-name'>
              {image.user.name.replace(/^[^_]*: |-(.*)/, "")}
            </span>
            <span className='user-location'>
              {image.user.location
                ? image.user.location.replace(/ and(.*)/, "")
                : "Planet Earth"}
            </span>
          </div>
        </div>
        <div className='user-likes'>
          <Icon icon='heart' />
          <span className='like-count'>{image.likes}</span>
        </div>
      </div>
    </a>
  </div>
);

export default CarouselCard;
