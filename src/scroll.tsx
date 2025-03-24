import { useEffect } from "react";

export const useScrollEffect = (backgroundRef: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    let ticking = false;  // スクロールの最適化用フラグ

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const background = backgroundRef.current;
          if (background) {
            const scrollPosition = window.scrollY;
            background.style.opacity = scrollPosition > 0 ? "1" : "0";
            background.style.transform = scrollPosition > 0 ? "translateY(0)" : "translateY(50px)";
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // 初回実行

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [backgroundRef]);
};




