import { useEffect } from "react";

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {};
  }, []);

  return null;
}

export default ScrollToTop;
