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

export const imageDimensionsPropTypes = PropTypes.shape({
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
});

export const optionPropType = PropTypes.shape({
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  swatch: PropTypes.string,
  color: PropTypes.string,
  priceModifier: PropTypes.number,
});

export const productType = PropTypes.shape({
  collection: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  images: PropTypes.shape({
    large: PropTypes.string.isRequired,
    small: PropTypes.string.isRequired,
  }).isRequired,
  rating: PropTypes.number,
  review_count: PropTypes.number,
  price: PropTypes.number.isRequired,
  options: PropTypes.array,
  sku: PropTypes.number.isRequired,
});

export const screenSizePropTypes = PropTypes.string.isRequired;
