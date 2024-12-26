import "./App.css";

function App() {

  const generateWaves = (count) => {
  const waves = [];
  for (let i = 0; i < count; i++) {
    const randomDuration = Math.random() * 5 + 3; // 3秒から8秒
    const randomDelay = Math.random() * 5; // 0〜5秒の遅延
    const randomHeight = Math.random() * 100; // 0〜100pxの高さ
    const randomColor = `hsl(${Math.random() * 360}, 70%, 80%)`; // ランダムな色
    const randomTranslateY = Math.random() * 30 + 10; // 10px〜40pxのランダムな上下移動幅
    const randomTranslateX = Math.random() * 50 - 25; // -25px〜25pxのランダムな左右移動幅
    const randomScale = Math.random() * 0.5 + 0.8;

    waves.push(
      <svg
        key={i}
        className="wave"
        style={{
          animationDuration: `${randomDuration}s`,
          animationDelay: `${randomDelay}s`,
          top: `${randomHeight}%`,
          stroke: randomColor,
          width: '100%', // SVGの幅を親要素に合わせる
          display: 'block', // 横方向のスペースを使わない
          '--random-move-y': `${randomTranslateY}px`, // CSS変数でランダムな上下移動幅を渡す
          '--random-move-x': `${randomTranslateX}px`, // CSS変数でランダムな左右移動幅を渡す
          '--random-scale': randomScale, // CSS変数でランダムなスケールを渡す
        }}
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,160 C120,120 240,200 360,160 C480,120 600,160 720,160 C840,160 960,120 1080,160 C1200,200 1320,120 1440,160"
          strokeWidth="3"
          fill="none"
          className="wave-path"
        />
      </svg>
    );
  }
  return waves;
};


  return (
    <div className="portfolio">
      <div className="portfolio_inner">
        <div className={`extra-content`}>
          {generateWaves(5)} {/* ランダムに動く波線を5つ生成 */}
        </div>
      </div>
    </div>
  );
}

export default App;
