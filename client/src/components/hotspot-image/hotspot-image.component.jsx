import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import useIntersectionObserver from "../../hooks/use-intersection-observer";
import useWindowSize from "../../hooks/use-window-size";
import { hotspotPropTypes } from "../../sharedPropTypes/sharedPropTypes";

import Spinner from "../spinner/spinner.component";
import ResponsiveImage from "../responsive-image/responsive-image.component";
import Pins from "../hotspot-image/pins.component";
import "./hotspot-image.styles.scss";

export default function HotspotImage({ backgroundImage, hotspots }) {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [loading, setLoading] = useState(true);
  const [intersectedOnce, setIntersectedOnce] = useState(false);
  const [imageIsVisible, setImageIsVisible] = useState(false);
  const [imageError, setImageError] = useState(null);
  const { targetRef: imageRef, isIntersecting } = useIntersectionObserver();

  const handleResize = useCallback(() => {
    const width = imageRef.current ? imageRef.current.offsetWidth : 0;
    const height = imageRef.current ? imageRef.current.offsetHeight : 0;

    setImageDimensions({ width, height });
  }, [imageRef]);

  const { screenSize } = useWindowSize(handleResize, 500);

  useEffect(() => {
    if (isIntersecting && !intersectedOnce) {
      // Lazily load the image and mark it as intersected once it's in the viewport
      setImageIsVisible(true);
      setIntersectedOnce(true);
    }
  }, [isIntersecting, intersectedOnce]);

  const handleImageLoaded = (image) => {
    setLoading(false);
    setImageDimensions({ width: image.width, height: image.height });
  };

  const handleError = () => {
    setLoading(false);
    setImageError(true);
  };

  return (
    <div className='hotspot-image-wrapper'>
      <div className='hotspot-image_inner-wrapper' ref={imageRef}>
        <div className='image-container'>
          {loading && isIntersecting && <Spinner />}
          {imageIsVisible && !imageError && (
            <ResponsiveImage
              picture={{
                ...backgroundImage,
                styles: `${backgroundImage.styles}${loading ? " loading" : ""}`,
              }}
              onLoaded={handleImageLoaded}
              onError={handleError}
            />
          )}
          {imageError && (
            <p className='img-error'>
              An error occurred while loading the&nbsp;image.
            </p>
          )}
        </div>
        {!loading && !imageError && isIntersecting && (
          <Pins
            hotspots={hotspots}
            screenSize={screenSize}
            imageDimensions={imageDimensions}
            hotspotsRef={imageRef}
          />
        )}
      </div>
    </div>
  );
}

HotspotImage.propTypes = {
  backgroundImage: PropTypes.shape({
    sources: PropTypes.arrayOf(
      PropTypes.shape({
        media: PropTypes.string,
        srcSet: PropTypes.string,
      })
    ).isRequired,
    alt: PropTypes.string,
    styles: PropTypes.string,
  }),
  hotspots: PropTypes.arrayOf(hotspotPropTypes).isRequired,
};
