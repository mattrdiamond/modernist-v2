import { useRef, useEffect, useState } from "react";

// options param includes instructions on when to trigger observer:
// a. threshold property (percentage of ref that is visible)
// b. rootMargin property (adjusts bounding box of ref)
export default function useOnScreen(options) {
  // use ref callback rather than useRef in case ref element is optionally displayed (safer)
  const [ref, setRef] = useState(null);
  const [visible, setVisible] = useState(false);
  console.log("intersection", ref);

  useEffect(() => {
    // set up observer
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, options);

    // observe element on screen
    if (ref && !visible) {
      observer.observe(ref);
    }

    // cleanup function
    return () => {
      if (ref) {
        // observer.unobserve(ref);
        observer.disconnect();
      }
    };
  }, [ref, options]);

  // return setRef function to be used in component as well as visible state
  return [setRef, visible];
}
