import React from "react";
import Icon from "../icon/icon.component";
import "./carousel-card.styles.scss";

export default function Image({ index, image, sliderState }) {
  return (
    <div
      className={`card ${
        index < sliderState.index ||
        index > sliderState.index + (sliderState.visibleImages - 1)
          ? "offscreen"
          : ""
      }`}
    >
      <img
        className="card-photo"
        src={image.urls.small}
        alt={image.alt_description}
      />
      <span className="temporary-index">{index}</span>
      <div className="card-footer">
        <div className="user-details-container">
          <img
            className="user-pic"
            src={image.user.profile_image.small}
            srcSet={`${image.user.profile_image.small} 1x, ${image.user.profile_image.medium} 2x`}
            alt={`${image.user.name} profile photo`}
          />
          <div className="user-details">
            <span className="user-name">
              {image.user.name.replace(/^[^_]*: |\-(.*)/, "")}
            </span>
            <span className="user-location">
              {image.user.location
                ? image.user.location.replace(/\ and(.*)/, "")
                : "Planet Earth"}
            </span>
          </div>
        </div>
        <div className="user-likes">
          <Icon icon="heart" />
          <span className="like-count">{image.likes}</span>
        </div>
      </div>
    </div>
  );
}
