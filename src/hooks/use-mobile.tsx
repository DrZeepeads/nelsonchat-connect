import { useState, useEffect } from "react";

/**
 * Custom hook to detect if the viewport width matches a given breakpoint.
 * Defaults to a "mobile" breakpoint of `768px`.
 *
 * @param breakpoint - The maximum width in pixels for the "mobile" state.
 * @returns `true` if the viewport width is less than the specified breakpoint, otherwise `false`.
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Add resize event listener
    window.addEventListener("resize", checkIsMobile);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [breakpoint]);

  return isMobile;
}