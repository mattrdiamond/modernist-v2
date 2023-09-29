import { useState, useEffect, useCallback } from "react";
import debounce from "../utils/debounce";
import PropTypes from "prop-types";

// Define the breakpoints for different screen sizes
export const breakpoints = {
  mobile: 700, // Example breakpoint for mobile devices
  tablet: 1000, // Example breakpoint for tablet devices
};

/**
 * Custom hook for tracking window size changes.
 *
 * @param {function} callback - A function to be called when the window size changes.
 * @param {number} delay - Delay in milliseconds before updating the window size.
 * @returns {object} An object containing window size information.
 */

export default function useWindowSize(callback, delay) {
  const isClient = typeof window === "object";

  const getSize = useCallback(() => {
    const width = isClient ? window.innerWidth : undefined;
    const height = isClient ? window.innerHeight : undefined;
    const screenSize = determineScreenSize(width);
    return { width, height, screenSize };
  }, [isClient]);

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    const handleResize = debounce(() => {
      const newSize = getSize();
      setWindowSize(newSize);
      callback(newSize);
    }, delay);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getSize, isClient, callback, delay]);

  return windowSize;
}

/**
 * Determine the screen size based on the provided breakpoints.
 */
function determineScreenSize(width) {
  if (width <= breakpoints.mobile) {
    return "mobile";
  } else if (width <= breakpoints.tablet) {
    return "tablet";
  } else {
    return "desktop";
  }
}

useWindowSize.propTypes = {
  callback: PropTypes.func.isRequired,
  delay: PropTypes.number.isRequired,
};
