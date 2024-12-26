import "./App.css";

function App() {

  const generateWaves = (count) => {
  const waves = [];
  for (let i = 0; i < count; i++) {
    const randomDuration = Math.random() * 5 + 3; // 3秒から8秒
    const randomDelay = Math.random() * 5; // 0〜5秒の遅延
    const randomHeight = Math.random() * 100; // 0〜100pxの高さ
    const randomColor = `hsl(${Math.random() * 360}, 70%, 80%)`; // ランダムな色

    // ランダムな移動量
    const randomTranslateY = Math.random() * 30 + 10; // 10px〜40pxのランダムな上下移動幅
    const randomTranslateX = Math.random() * 50 - 25; // -25px〜25pxのランダムな左右移動幅
    const randomScale = Math.random() * 0.5 + 0.8; // 0.8〜1.3倍のランダムスケール

    // ランダムな波の開始位置と終了位置
    const randomStartX = Math.random() * 360; // 開始X位置
    const randomEndX = 1440 - Math.random() * 360; // 終了X位置

    // ランダムなコントロールポイント（波の動きを制御する点）
    const controlPoint1Y = Math.random() * 100 + 50;
    const controlPoint2Y = Math.random() * 100 + 50;

    // ランダムな波のパスを作成
    const wavePath = `M${randomStartX},160 C${randomStartX + 120},${controlPoint1Y} ${randomStartX + 240},${controlPoint2Y} ${randomStartX + 360},160 
                      C${randomStartX + 480},120 ${randomStartX + 600},160 ${randomStartX + 720},160 
                      C${randomStartX + 840},160 ${randomStartX + 960},120 ${randomStartX + 1080},160 
                      C${randomStartX + 1200},200 ${randomStartX + 1320},120 ${randomEndX},160`; // ランダムな波形

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
        {/* 波のパスにランダムな始点と終点を反映 */}
        <path
          d={wavePath}
          strokeWidth="3"
          fill="none"
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
