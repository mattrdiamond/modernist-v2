import PropTypes from "prop-types";

/**
 * Debounces a function, ensuring it's only called after a specified delay.
 *
 * @param {function} func - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {function} - A debounced version of the input function.
 */
export default function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

debounce.propTypes = {
  func: PropTypes.func.isRequired,
  delay: PropTypes.number.isRequired,
};
