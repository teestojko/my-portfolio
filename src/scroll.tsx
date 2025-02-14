import { useEffect } from "react";

export const useScrollEffect = (backgroundRef: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const onScroll = () => {
      const background = backgroundRef.current;

      if (background) {
        const scrollPosition = window.scrollY;

        if (scrollPosition > window.innerHeight * 0) {
          background.style.opacity = "1";
          background.style.transform = "translateY(0)";
        } else {
          background.style.opacity = "0";
          background.style.transform = "translateY(50px)";
        }
      }
    };

    window.addEventListener("scroll", onScroll);

    // 初期化時にも実行
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [backgroundRef]);
};
