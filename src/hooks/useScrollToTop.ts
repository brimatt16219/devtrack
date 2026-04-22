import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // scrollToTop runs after every route change
    // useRef isn't needed here because window is global — not a React-managed DOM node
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]); // re-runs whenever the route changes
}