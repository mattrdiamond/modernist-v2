import { useEffect } from "react";
import PropTypes from "prop-types";

/**
 * A custom hook for detecting clicks outside a specified element.
 *
 * @param {Object} options - The hook options.
 * @param {React.RefObject} options.ref - The reference to the element to detect clicks outside of.
 * @param {function} options.handler - The callback function to execute when a click outside is detected.
 * @param {string} [options.ignoreOutsideElementClass=""] - The class name of elements to ignore outside clicks on.
 * @param {string} [options.includeInsideElementClass=""] - The class name of elements to include for inside clicks.
 * @param {boolean} [options.isHidden=false] - If true, the click detection is hidden (disabled).
 */

export default function useOnClickOutside({
  ref,
  handler,
  ignoreOutsideElementClass = "",
  includeInsideElementClass = "",
  isHidden = false,
}) {
  useEffect(() => {
    const listener = (e) => {
      try {
        if (
          (e.type === "keyup" && e.key !== "Tab") ||
          !ref.current ||
          e.target.classList.contains(ignoreOutsideElementClass) || // Ignored outside elements
          isHidden
        ) {
          return;
        }

        if (
          includeInsideElementClass &&
          e.target.classList.contains(includeInsideElementClass)
        ) {
          // Execute the handler when e.target has the includeInsideElementClass class
          handler(e);
        } else if (!ref.current.contains(e.target)) {
          handler(e);
        }
      } catch (error) {
        // TO DO: Handle any errors that occur during event handling
        console.error("Error in useOnClickOutside:", error);
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    document.addEventListener("keyup", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      document.removeEventListener("keyup", listener);
    };
  }, [
    ref,
    handler,
    ignoreOutsideElementClass,
    includeInsideElementClass,
    isHidden,
  ]);
}

useOnClickOutside.propTypes = {
  ref: PropTypes.object.isRequired,
  handler: PropTypes.func.isRequired,
  ignoreOutsideElementClass: PropTypes.string,
  includeInsideElementClass: PropTypes.string,
  isHidden: PropTypes.bool,
};
