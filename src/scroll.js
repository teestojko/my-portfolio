export const initializeScrollEffect = (backgroundRef) => {
  const randomizeLights = () => {
    // ランダムな光のエフェクトを初期化
    const lights = document.querySelectorAll(".light-effect");
    lights.forEach((light) => {
      light.style.left = `${Math.random() * 100}%`;
      light.style.top = `${Math.random() * 100}%`;
    });
  };

  const onScroll = () => {
    const scrollPosition = window.scrollY;
    const background = backgroundRef.current;

    if (background) {
      if (scrollPosition > window.innerHeight * 0) {
        background.style.opacity = 1;
        background.style.transform = "translateY(0)";
      } else {
        background.style.opacity = 0;
        background.style.transform = "translateY(50px)";
      }
    }
  };

  // 初期化処理
  randomizeLights();
  onScroll();

  // スクロールイベントの登録
  window.addEventListener("scroll", onScroll);

  // クリーンアップ関数を返す
  return () => {
    window.removeEventListener("scroll", onScroll);
  };
};
