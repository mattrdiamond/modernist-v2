import React, { createContext, useContext, useEffect, useState } from "react";
import debounce from "../utils/debounce";

const WindowSizeContext = createContext();

export const useWindowSize = () => useContext(WindowSizeContext);

export const WindowSizeProvider = ({ children, debounceDelay = 300 }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, debounceDelay);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [debounceDelay]);

  return (
    <WindowSizeContext.Provider value={windowSize}>
      {children}
    </WindowSizeContext.Provider>
  );
};
