import PropTypes from "prop-types";

/*
 * Sort array in ascending order by property
 */
export const sortAsc = (arr, property) =>
  [...arr].sort((a, b) => (a[property] > b[property] ? 1 : -1));

/*
 * Sort array in descending order by property
 */
export const sortDesc = (arr, property) =>
  [...arr].sort((a, b) => (a[property] > b[property] ? -1 : 1));

sortDesc.propTypes = {
  arr: PropTypes.array.isRequired,
  property: PropTypes.string.isRequired,
};
