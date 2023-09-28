import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  screenSizePropTypes,
  imageDimensionsPropTypes,
  hotspotPropTypes,
} from "./commonPropTypes";

import Pin from "./pin.component";
import "./hotspot-image.styles.scss";

export default function Pins({
  hotspots,
  screenSize,
  imageDimensions,
  hotspotsRef,
}) {
  const [openHotspotId, setOpenHotspotId] = useState(null);
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  useEffect(() => {
    // Listen for click events when a hotspot is open and close hotspot when clicking away.
    if (!isTouchDevice || openHotspotId === null) return;

    const handleClickOutside = (e) => {
      if (
        !hotspotsRef.current?.contains(e.target) ||
        e.target.classList.contains("pins-container")
      ) {
        setOpenHotspotId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isTouchDevice, openHotspotId, hotspotsRef]);

  const handleMouseEnter = (id) => {
    if (isTouchDevice) return;
    setOpenHotspotId(id);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setOpenHotspotId(null);
  };

  const handlePinClick = (id) => {
    setOpenHotspotId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className='pins-container'>
      {hotspots.map((hotspot) => (
        <Pin
          key={hotspot.id}
          hotspot={hotspot}
          screenSize={screenSize}
          imageDimensions={imageDimensions}
          handlePinClick={() => handlePinClick(hotspot.id)}
          openHotspotId={openHotspotId}
          onMouseEnter={() => handleMouseEnter(hotspot.id)}
          onMouseLeave={handleMouseLeave}
          isTouchDevice={isTouchDevice}
        />
      ))}
    </div>
  );
}

Pins.propTypes = {
  hotspots: PropTypes.arrayOf(hotspotPropTypes).isRequired,
  screenSize: screenSizePropTypes,
  imageDimensions: imageDimensionsPropTypes,
  hotspotsRef: PropTypes.object.isRequired,
};
