import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  screenSizePropTypes,
  imageDimensionsPropTypes,
  hotspotPropTypes,
} from "./commonPropTypes";
import handleKeyPress from "../../utils/handleKeyPress";

import Icon from "../icon/icon.component";
import "./pin.styles.scss";

const getHotspotContentPosition = (hotspot, screenSize, imageDimensions) => {
  const { x, y } = hotspot.coordinates[screenSize];
  const { width, height } = imageDimensions;

  // Margin settings for different screen sizes. The safety margin serves to keep hotspot content within the image boundaries.
  const marginSettings = {
    mobile: { x: 95, y: 120 },
    desktop: { x: 160, y: 120 },
  };

  const safetyMargin = marginSettings[screenSize] || marginSettings.desktop;

  // Calculate pixels from the image edges to the hotspot and position the popup accordingly.
  const pixelsFromRight = width - (width * x) / 100;
  const pixelsFromLeft = (width * x) / 100;
  const pixelsFromTop = (height * y) / 100;

  if (pixelsFromTop <= safetyMargin.y) {
    if (pixelsFromLeft > safetyMargin.x && pixelsFromRight > safetyMargin.x) {
      return "below";
    }
  } else if (pixelsFromLeft <= safetyMargin.x) {
    return "right";
  } else if (pixelsFromRight <= safetyMargin.x) {
    return "left";
  }
  return "above";
};

export default function Pin({
  hotspot,
  screenSize,
  imageDimensions,
  handlePinClick,
  openHotspotId,
  onMouseEnter,
  onMouseLeave,
  isTouchDevice,
}) {
  const isPinOpen = openHotspotId === hotspot.id;

  const handleClick = (e) => {
    // Stop the event from propagating to handleClickOutside
    e.stopPropagation();

    // Only handle mouse and keyboard events
    if (!isTouchDevice && e.type !== "keydown") return;

    if (isPinOpen) {
      const isClickInsidePinContent =
        e.currentTarget.contains(e.target) &&
        e.currentTarget.querySelector(".pin-content").contains(e.target);

      if (!isClickInsidePinContent) {
        handlePinClick(null);
      }
    } else {
      handlePinClick(hotspot.id);
    }
  };

  const contentPosition = getHotspotContentPosition(
    hotspot,
    screenSize,
    imageDimensions
  );

  return (
    <div
      className={`pin-anchor${isPinOpen ? " open" : ""}`}
      style={{
        left: `${hotspot.coordinates[screenSize].x}%`,
        top: `${hotspot.coordinates[screenSize].y}%`,
      }}
      tabIndex='0'
      onClick={(e) => handleClick(e)}
      onMouseEnter={() => onMouseEnter(hotspot.id)}
      onMouseLeave={onMouseLeave}
      onKeyDown={(e) => handleKeyPress(e, handleClick)}
      role='button'
      aria-label={hotspot.name}
      aria-describedby={`hotspot-description-${hotspot.id}`}
      aria-expanded={isPinOpen ? "true" : "false"}
    >
      <div className={`pin-content-anchor ${contentPosition || ""}`}>
        {/*-------- TO DO: update link with actual product --------*/}
        <Link to='shop/lighting/14'>
          <div className='pin-content'>
            <div className='pin-content_thumbnail' />
            <div className='pin-content_text'>
              <p className='pin-content_name line-clamp-2'>{hotspot.name}</p>
              <p className='pin-content_price'>{hotspot.price}</p>
            </div>
            <div className='arrow-container'>
              <Icon icon='arrow-right' />
            </div>
          </div>
        </Link>
      </div>
      <div className='pin-circle' />
    </div>
  );
}

Pin.propTypes = {
  hotspot: hotspotPropTypes.isRequired,
  screenSize: screenSizePropTypes,
  imageDimensions: imageDimensionsPropTypes,
  handlePinClick: PropTypes.func.isRequired,
  openHotspotId: PropTypes.number,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  isTouchDevice: PropTypes.bool.isRequired,
};
