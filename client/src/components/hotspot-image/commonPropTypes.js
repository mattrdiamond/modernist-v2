import PropTypes from "prop-types";

export const hotspotPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  shopId: PropTypes.number.isRequired,
  collection: PropTypes.oneOf([
    "bedding",
    "decor",
    "chairs",
    "lighting",
    "sofas",
    "tables",
  ]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  coordinates: PropTypes.shape({
    mobile: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    tablet: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    desktop: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
});

export const screenSizePropTypes = PropTypes.string.isRequired;
export const imageDimensionsPropTypes = PropTypes.shape({
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
});
