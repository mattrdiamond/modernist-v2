import { useState, useEffect, useCallback } from "react";
import { debounce } from "./utils";

export default function useWindowSize(callback) {
  const isClient = typeof window === "object";

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }, [isClient]);

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    const handleResize = debounce(() => {
      setWindowSize(getSize());
      callback();
    }, 500);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getSize, isClient, callback]);

  return windowSize;
}
