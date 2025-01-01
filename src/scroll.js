import { useEffect } from "react";

export const useScrollEffect = (backgroundRef) => {
  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY;
      const background = backgroundRef.current;

      if (scrollPosition > window.innerHeight * 0) {
        // 表示までのスクロール幅
        background.style.opacity = 1;
        background.style.transform = "translateY(0)";
      } else {
        background.style.opacity = 0;
        background.style.transform = "translateY(50px)";
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
