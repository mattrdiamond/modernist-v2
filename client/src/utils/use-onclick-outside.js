import { useEffect } from "react";

// Close ref when user clicks or tabs outside element
export default function useOnClickOutside(
  ref,
  handler,
  ignoredClass,
  isHidden
) {
  useEffect(() => {
    const listener = (e) => {
      if (
        // Exit when:
        // 1. Pressing a key other than "Tab"
        (e.type === "keyup" && e.key !== "Tab") ||
        // 2. Clicking ref's element or descendent elements
        !ref.current ||
        ref.current.contains(e.target) ||
        // 3. Target element contains ignored class
        e.target.classList.contains(ignoredClass) ||
        // 4. Element is hidden
        isHidden
      ) {
        return;
      }
      console.log("close from event", e.target.classList);
      handler(e);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    document.addEventListener("keyup", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      document.removeEventListener("keyup", listener);
    };
  }, [ref, handler, ignoredClass, isHidden]);
}
