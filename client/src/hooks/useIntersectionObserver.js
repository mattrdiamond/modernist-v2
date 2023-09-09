import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = ({
  threshold = 0,
  root = null,
  rootMargin = "0px 0px 0px 0px",
  observeOnce = false,
} = {}) => {
  const targetRef = useRef(null);
  const observerRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const node = targetRef?.current; // DOM Ref
  const hasIOSupport = !!window.IntersectionObserver;

  useEffect(() => {
    console.log("UE-observer");
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
  }, [threshold, root, observeOnce, node, hasIOSupport]);

  return {
    targetRef,
    isIntersecting,
  };
};

export default useIntersectionObserver;
