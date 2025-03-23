// import { useEffect } from "react";

// export const useScrollEffect = (backgroundRef: React.RefObject<HTMLDivElement | null>) => {
//   useEffect(() => {
//     const onScroll = () => {
//       const background = backgroundRef.current;

//       if (background) {
//         const scrollPosition = window.scrollY;

//         if (scrollPosition > window.innerHeight * 0) {
//           background.style.opacity = "1";
//           background.style.transform = "translateY(0)";
//         } else {
//           background.style.opacity = "0";
//           background.style.transform = "translateY(50px)";
//         }
//       }
//     };

//     window.addEventListener("scroll", onScroll);

//     // 初期化時にも実行
//     onScroll();

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//     };
//   }, [backgroundRef]);
// };

import { useEffect } from "react";
import { debounce } from "lodash"; // lodash の debounce を使用

export const useScrollEffect = (backgroundRef: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const onScroll = () => {
      requestAnimationFrame(() => {
        const background = backgroundRef.current;
        if (background) {
          const scrollPosition = window.scrollY;
          background.style.opacity = scrollPosition > 0 ? "1" : "0";
          background.style.transform = scrollPosition > 0 ? "translateY(0)" : "translateY(50px)";
        }
      });
    };

    // スクロール処理を最適化（50msごとに処理）
    const optimizedScroll = debounce(onScroll, 50);
    window.addEventListener("scroll", optimizedScroll);
    
    // 初回実行
    onScroll();

    return () => {
      window.removeEventListener("scroll", optimizedScroll);
    };
  }, [backgroundRef]);
};



