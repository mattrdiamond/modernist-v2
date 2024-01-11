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

export const productDetailType = PropTypes.shape({
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

export const heroBannerPropType = PropTypes.shape({
  large: PropTypes.string.isRequired,
  small: PropTypes.string.isRequired,
});

export const productTagPropType = PropTypes.shape({
  new: PropTypes.bool,
  bestseller: PropTypes.bool,
  "top-rated": PropTypes.bool,
});

export const categoryItemType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  collection: PropTypes.string.isRequired,
  images: heroBannerPropType.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  tags: productTagPropType,
});

export const collectionTitlePropType = PropTypes.oneOf([
  "Bedding",
  "Decor",
  "Chairs & Ottomans",
  "Lighting",
  "Sofas & Sectionals",
  "Tables",
]);

export const collectionIdPropType = PropTypes.oneOf([
  "bedding",
  "decor",
  "chairs",
  "lighting",
  "sofas",
  "tables",
]);

export const collectionPropType = PropTypes.shape({
  banner: heroBannerPropType,
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(categoryItemType).isRequired,
  routeName: collectionIdPropType.isRequired,
  title: collectionTitlePropType.isRequired,
});

export const errorPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.oneOf([null]),
]);

export const screenSizePropTypes = PropTypes.string.isRequired;

export const slidePropType = PropTypes.arrayOf(PropTypes.node);
