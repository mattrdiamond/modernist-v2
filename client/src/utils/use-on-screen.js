import { useEffect, useState } from "react";

/*  UseOnScreen hook - detects when an element is visible on the screen
     (options) includes instructions on when to trigger observer:
         a. threshold property (percentage of ref that is visible)
         b. rootMargin property (adjusts bounding box of ref element) */

export default function useOnScreen(options) {
  // Component uses setRef to update this ref state with the DOM element to be observed
  const [ref, setRef] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Set up observer - sets visible to true when intersecting
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, options);

    // Observe element on screen only if it's not visible yet
    if (ref && !visible) {
      observer.observe(ref);
    }

    // Cleanup function - stop observing when there is a ref
    return () => {
      if (ref) {
        observer.disconnect();
      }
    };
  }, [ref, options, visible]);

  // Return setRef function and visible state to be used in component
  return [setRef, visible];
}
