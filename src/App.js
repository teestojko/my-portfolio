import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const generateWaves = (count) => {
    const waves = [];
    for (let i = 0; i < count; i++) {
      const randomDuration = Math.random() * 5 + 3; // 3秒から8秒
      const randomDelay = Math.random() * 5; // 0〜5秒の遅延
      const randomHeight = Math.random() * 100; // 0〜100pxの高さ
      const randomColor = `hsl(${Math.random() * 360}, 70%, 80%)`; // ランダムな色

      waves.push(
        <svg
          key={i}
          className="wave"
          style={{
            animationDuration: `${randomDuration}s`,
            animationDelay: `${randomDelay}s`,
            top: `${randomHeight}%`,
            stroke: randomColor,
          }}
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,160 C120,260 240,60 360,160 C480,260 600,160 720,160 C840,160 960,260 1080,160 C1200,60 1320,260 1440,160 L1440,320 L0,320 Z"
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
