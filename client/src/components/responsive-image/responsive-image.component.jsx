import React from "react";
import PropTypes from "prop-types";
import { responsiveImagePropType } from "../../sharedPropTypes/sharedPropTypes";

export default function ResponsiveImage({
  picture = {},
  onLoaded = null,
  onError = null,
}) {
  const { sources, alt, styles } = picture;

  const handleImageEvent = (e, callback) => {
    if (callback && typeof callback === "function") {
      callback(e);
    }
  };

  const handleImageLoad = (e) => {
    handleImageEvent(e.target, onLoaded);
  };

  const handleError = (e) => {
    handleImageEvent(e, onError);
  };

  return (
    <picture>
      {sources.map((source, index) => (
        <source
          key={index}
          srcSet={source.srcSet}
          media={source.media}
          type={source.type}
        />
      ))}
      <img
        src={sources[sources.length - 1].srcSet.split(" ")[0]}
        alt={alt || ""}
        className={styles || ""}
        onLoad={handleImageLoad}
        onError={handleError}
      />
    </picture>
  );
}

ResponsiveImage.propTypes = {
  picture: responsiveImagePropType.isRequired,
  onLoaded: PropTypes.func,
  onError: PropTypes.func,
};
