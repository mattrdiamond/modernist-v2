import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

/**
 * A custom hook for observing an element's intersection with its container.
 *
 * @param {object} options - Configuration options for the IntersectionObserver.
 * @param {number} options.threshold - A threshold value for intersection.
 * @param {Element} options.root - The container element to use as the viewport.
 * @param {string} options.rootMargin - Margin around the root element.
 * @param {boolean} options.observeOnce - Whether to observe only once and disconnect.
 * @returns {object} - An object containing the targetRef and isIntersecting state.
 */
const useIntersectionObserver = ({
  threshold = 0,
  root = null,
  rootMargin = "0px 0px 0px 0px",
  observeOnce = false,
} = {}) => {
  const targetRef = useRef(null);
  const observerRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const hasIOSupport = !!window.IntersectionObserver;

  useEffect(() => {
    const node = targetRef?.current; // DOM Ref

    if (!hasIOSupport || !node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsIntersecting(entry.isIntersecting);
          if (observeOnce && entry.isIntersecting) {
            // Stop observing after the first intersection
            observer.disconnect();
          }
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, root, observeOnce, hasIOSupport, rootMargin]);

  return {
    targetRef,
    isIntersecting,
  };
};

useIntersectionObserver.propTypes = {
  options: PropTypes.shape({
    threshold: PropTypes.number,
    root: PropTypes.instanceOf(Element),
    rootMargin: PropTypes.string,
    observeOnce: PropTypes.bool,
  }),
};

export default useIntersectionObserver;
